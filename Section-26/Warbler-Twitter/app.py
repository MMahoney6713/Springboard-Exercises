from flask import Flask, render_template, request, flash, redirect, session, g, url_for, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy.exc import IntegrityError
from functools import wraps
from config import set_config

from forms import UserAddForm, LoginForm, MessageForm, UpdateUserForm
from models import db, connect_db, User, Message, Likes

CURR_USER_KEY = "curr_user"

app = Flask(__name__)
set_config(app)

# Flask Debug toolbar 
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = True
# toolbar = DebugToolbarExtension(app)

connect_db(app)


##############################################################################
# User signup/login/logout


@app.before_request
def add_user_to_g():
    """If we're logged in, add curr user to Flask global."""

    if CURR_USER_KEY in session:
        g.user = User.query.get(session[CURR_USER_KEY])

    else:
        g.user = None


def do_login(user):
    """Log in user."""

    session[CURR_USER_KEY] = user.id


def do_logout():
    """Logout user."""

    if CURR_USER_KEY in session:
        del session[CURR_USER_KEY]


# @login_required decorator for routes requiring authentication
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if g.user is None:
            flash("Please login to continue.", "danger")
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/signup', methods=["GET", "POST"])
def signup():
    """Handle user signup.

    Create new user and add to DB. Redirect to home page.

    If form not valid, present form.

    If the there already is a user with that username: flash message
    and re-present form.
    """

    form = UserAddForm()

    if form.validate_on_submit():
        try:
            user = User.signup(
                username=form.username.data,
                password=form.password.data,
                email=form.email.data,
                image_url=form.image_url.data or User.image_url.default.arg,
            )
            db.session.commit()

        except IntegrityError:
            flash("Username already taken", 'danger')
            return render_template('users/signup.html', form=form)

        do_login(user)

        return redirect("/")

    else:
        return render_template('users/signup.html', form=form)


@app.route('/login', methods=["GET", "POST"])
def login():
    """Handle user login."""

    form = LoginForm()

    if form.validate_on_submit():
        user = User.authenticate(form.username.data,
                                 form.password.data)

        if user:
            do_login(user)
            flash(f"Hello, {user.username}!", "success")

            next_url = request.form.get('next')
            if next_url:
                return redirect(next_url)
            else:
                return redirect("/")

        flash("Invalid login information.", 'danger')

    return render_template('users/login.html', form=form)


@app.route('/logout')
def logout():
    """Handle logout of user."""

    do_logout()
    flash("You are logged out.", 'success')
    
    return redirect('/login')


##############################################################################
# General user routes:

@app.route('/users')
def list_users():
    """Page with listing of users.

    Can take a 'q' param in querystring to search by that username.
    """

    search = request.args.get('q')

    if not search:
        users = User.query.all()
    else:
        users = User.query.filter(User.username.like(f"%{search}%")).all()

    return render_template('users/index.html', users=users)


@app.route('/users/<int:user_id>')
def users_show(user_id):
    """Show user profile."""

    user = User.get_user(user_id)

    messages = (Message
                .query
                .filter(Message.user_id == user_id)
                .order_by(Message.timestamp.desc())
                .limit(100)
                .all())
    return render_template('users/messages.html', user=user, messages=messages)


@app.route('/users/<int:user_id>/following')
@login_required
def show_following(user_id):
    """Show list of people this user is following."""

    user = User.get_user(user_id)
    return render_template('users/following.html', user=user)


@app.route('/users/<int:user_id>/followers')
@login_required
def users_followers(user_id):
    """Show list of followers of this user."""

    user = User.get_user(user_id)
    return render_template('users/followers.html', user=user)


@app.route('/users/follow/<int:follow_id>', methods=['POST'])
@login_required
def add_follow(follow_id):
    """Add a follow for the currently-logged-in user."""

    followed_user = User.get_user(follow_id)
    g.user.following.append(followed_user)
    db.session.commit()

    return redirect(f"/users/{g.user.id}/following")


@app.route('/users/stop-following/<int:follow_id>', methods=['POST'])
@login_required
def stop_following(follow_id):
    """Have currently-logged-in-user stop following this user."""

    followed_user = User.get_user(follow_id)
    g.user.following.remove(followed_user)
    db.session.commit()

    return redirect(f"/users/{g.user.id}/following")


@app.route('/users/profile', methods=["GET", "POST"])
@login_required
def profile():
    """Update profile for current user."""

    user = g.user
    form = UpdateUserForm(username=user.username, email=user.email, bio=user.bio)

    if form.validate_on_submit():
        
        if User.authenticate(user.username, form.password.data):
            update_user_with_form_data(user, form)
            db.session.commit()
        else:
            flash('Could not authenticate - please try again.', 'danger')

        return redirect(f'users/{user.id}')

    return render_template('users/edit.html', form=form, user=user)


def update_user_with_form_data(user, form):
    for key in form.data.keys():
        if key != "password" and form[key].data != '':
            setattr(user, key, form[key].data)


@app.route('/users/delete', methods=["POST"])
@login_required
def delete_user():
    """Delete user."""

    do_logout()

    db.session.delete(g.user)
    db.session.commit()

    return redirect("/signup")


@app.route('/users/likes', methods=["POST"])
@login_required
def toggle_likes():

    message = Message.get_message_from_id(request.json.get('messageID'))
    like_status = Likes.toggle_like_status(message, g.user)
    
    return (jsonify(like_status), 200)


@app.route('/users/<int:user_id>/likes')
@login_required
def show_likes(user_id):
    """Show list of messages this user is likes."""

    user = User.get_user(user_id)
    likes_ids = [message.id for message in user.likes]
    messages = (Message
                .query
                .filter(Message.id.in_(likes_ids))
                .order_by(Message.timestamp.desc())
                .limit(100)
                .all())
    return render_template('users/messages.html', user=user, messages=messages)

##############################################################################
# Messages routes:

@app.route('/messages', methods=["POST"])
@login_required
def messages_add():

    message_text = request.json.get('text')

    if message_text != '':
        new_message = Message(text=message_text)
        Message.append_message_to_user(new_message, g.user)

        return (jsonify(message=new_message.to_json(), user=g.user.to_json()), 201)

    else:
        return (jsonify(error="Please enter a message into the text box"), 204)


@app.route('/messages/<int:message_id>')
def messages_show(message_id):
    """Show a message."""

    message = Message.get_message_from_id(message_id)
    return render_template('messages/show.html', message=message)


@app.route('/messages/<int:message_id>/delete', methods=["POST"])
@login_required
def messages_destroy(message_id):
    """Delete a message."""

    message = Message.get_message_from_id(message_id)
    db.session.delete(message)
    db.session.commit()

    return redirect(f"/users/{g.user.id}")


##############################################################################
# Homepage and error pages


@app.route('/')
def homepage():
    """Show homepage:

    - anon users: no messages
    - logged in: 100 most recent messages of followed_users
    """
    
    if g.user:
        followed_users_ids = [follower.id for follower in g.user.following] + [g.user.id]

        messages = (Message
                    .query
                    .filter(Message.user_id.in_(followed_users_ids))
                    .order_by(Message.timestamp.desc())
                    .limit(100)
                    .all())

        likes = [message.id for message in g.user.likes]


        return render_template('home.html', messages=messages, likes=likes)

    else:
        return render_template('home-anon.html')


##############################################################################
# Turn off all caching in Flask
#   (useful for dev; in production, this kind of stuff is typically
#   handled elsewhere)
#
# https://stackoverflow.com/questions/34066804/disabling-caching-in-flask

@app.after_request
def add_header(req):
    """Add non-caching headers on every request."""

    req.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    req.headers["Pragma"] = "no-cache"
    req.headers["Expires"] = "0"
    req.headers['Cache-Control'] = 'public, max-age=0'
    return req
