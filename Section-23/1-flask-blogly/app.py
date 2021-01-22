"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()


@app.route('/')
def list_users():
    """Redirects to the Users List page"""

    return redirect('/users')


@app.route('/users')
def show_users():
    """Show all users, with links to detailed pages for each user"""

    users = User.query.order_by(
        User.last_name, User.first_name).all()
    return render_template('users.html', users=users)


@app.route('/users/new')
def add_user_form():
    """Show the form for submitting a new user"""

    return render_template('add-user.html')


@app.route('/users/new', methods=["POST"])
def add_user():
    """Adds user from form into database"""

    first_name = request.form['first-name']
    last_name = request.form['last-name']
    image_url = request.form['img-url']

    user = User(first_name=first_name,
                last_name=last_name, image_url=image_url)
    db.session.add(user)
    db.session.commit()

    return redirect('/users')


@app.route('/users/<int:user_id>')
def user_info(user_id):
    """Display info specific to the given user"""

    user = User.query.get_or_404(user_id)
    return render_template('user-info.html', user=user)


@app.route('/users/<int:user_id>/edit')
def edit_user_form(user_id):
    """Show the edit user form for editing an existing user"""

    user = User.query.get_or_404(user_id)
    return render_template('edit-user.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def edit_user(user_id):
    """Edits the given user information into the database"""

    user = User.query.get_or_404(user_id)

    user.first_name = request.form['first-name']
    user.last_name = request.form['last-name']
    user.image_url = request.form['img-url']

    db.session.commit()

    return redirect(f'/users/{user_id}')


@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    """Deletes the given user from the database"""

    User.query.filter(User.id == user_id).delete()
    db.session.commit()

    return redirect('/users')
