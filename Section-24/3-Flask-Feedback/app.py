from flask import Flask, render_template, redirect, session, flash
from functools import wraps
from models import connect_db, db, Users, Feedback
from forms import UserRegisterForm, UserLoginForm, FeedbackForm
from secret import set_secret_key
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)
set_secret_key(app)


##### App Routes #####

@app.route('/', methods=['GET', 'POST'])
@app.route('/register', methods=['GET', 'POST'])
def register_user():
    username = session.get('username')
    if username:
        return redirect(f'/users/{username}')

    form = UserRegisterForm()

    if form.validate_on_submit():
        username, password, email, first_name, last_name = parse_user_form(form)
        
        new_user = Users.register(username=username, password=password, 
                        email=email, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Please choose another')
            return render_template('register.html', form=form)
        
        session['username'] = new_user.username
        return redirect(f'/users/{new_user.username}')
    
    return render_template('register.html', form=form)


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    username = session.get('username')
    if username:
        return redirect(f'/users/{username}')
    
    form = UserLoginForm()

    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        user = Users.authenticate(username, password)
        
        if user:
            session['username'] = user.username
            return redirect(f'/users/{user.username}')
        else:
            form.username.errors = ['Invalid username/password']

    return render_template('login.html', form=form)


@app.route('/logout')
def logout_user():
    session.pop('username')
    return redirect('/')



##### Authentication Required Routes #####

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('username') is None:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function


@app.route('/users/<username>')
@login_required
def show_user(username):

    user = Users.query.filter_by(username=username).first()
    return render_template('user.html', user=user)


@app.route('/users/<username>/delete', methods=['POST'])
@login_required
def delete_user(username):

    if username != session['username']:
        return redirect(f'/users/{username}')

    user = Users.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    return redirect('/')


@app.route('/users/<username>/feedback/add', methods=['GET','POST'])
@login_required
def add_feedback(username):

    form = FeedbackForm()

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        new_feedback = Feedback(title=title, content=content, username=username)
        db.session.add(new_feedback)
        db.session.commit()
        return redirect(f'/users/{username}')

    return render_template('feedback.html', form=form)


@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
@login_required
def delete_feedback(feedback_id):
    
    feedback = Feedback.query.get_or_404(feedback_id)
    username = feedback.username
    
    if username != session['username']:
        return redirect(f'/users/{username}')

    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{username}')


@app.route('/feedback/<feedback_id>/update', methods=['GET','POST'])
@login_required
def edit_feedback(feedback_id):

    feedback = Feedback.query.get_or_404(feedback_id)
    form = FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()
        return redirect(f'/users/{feedback.username}')

    return render_template('feedback.html', form=form)




##### App Helper Functions #####

def parse_user_form(form):
    username = form.username.data
    password = form.password.data
    email = form.email.data
    first_name = form.first_name.data
    last_name = form.last_name.data
    return username, password, email, first_name, last_name

