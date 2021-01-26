"""Blogly application."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, User, Post, Tag, PostTag
from datetime import datetime

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


##### User model routes #####

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
    posts = user.posts
    return render_template('user-info.html', user=user, posts=posts)


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


##### Post model routes #####

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    """Shows the given post"""

    post = Post.query.get_or_404(post_id)
    return render_template('show-post.html', post=post)


@app.route('/users/<int:user_id>/posts/new')
def show_new_post_form(user_id):
    """Shows the form to create a new post"""

    user = User.query.get_or_404(user_id)
    all_tags = Tag.query.all()
    return render_template('add-post.html', user=user, all_tags=all_tags)


@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def create_new_post(user_id):
    """Creates new post using form data and inserts into database"""

    title = request.form['title']
    content = request.form['content']
    tag_ids = [int(tag_id)
               for tag_id in request.form.getlist("tag-id")]

    post = Post(title=title, content=content,
                created_at=datetime.now(), user_id=user_id)
    post.tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    db.session.add(post)
    db.session.commit()

    return redirect(f'/users/{user_id}')


@app.route('/posts/<int:post_id>/edit')
def edit_post_form(post_id):
    """Shows the Edit Post form"""

    post = Post.query.get_or_404(post_id)
    all_tags = Tag.query.all()
    return render_template('edit-post.html', post=post, all_tags=all_tags)


@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def edit_post(post_id):
    """Takes form input to edit the given post in the database"""

    post = Post.query.get_or_404(post_id)
    post.title = request.form['title']
    post.content = request.form['content']

    updated_tag_ids = [int(tag_id)
                       for tag_id in request.form.getlist("tag-id")]
    post.tags = Tag.query.filter(Tag.id.in_(updated_tag_ids)).all()

    db.session.add(post)
    db.session.commit()

    return redirect(f'/posts/{post_id}')


@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    """Deletes the given post from the database"""

    post = Post.query.get_or_404(post_id)
    user = post.user

    Post.query.filter(Post.id == post_id).delete()
    db.session.commit()

    return redirect(f'/users/{user.id}')


##### Tag model routes #####

@app.route('/tags')
def show_tags():
    """Shows a list of all tags in blogly"""

    tags = Tag.query.all()

    return render_template('show-tags.html', tags=tags)


@app.route('/tags/<int:tag_id>')
def show_tags_and_posts(tag_id):
    """Shows the posts corresponding to given tag"""

    tag = Tag.query.get_or_404(tag_id)
    return render_template('show-tag-posts.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit')
def edit_tag_form(tag_id):
    """Shows the form to edit the current tag"""

    tag = Tag.query.get_or_404(tag_id)
    return render_template('edit-tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def edit_tag(tag_id):
    """Edits the current tag with info provided in form"""

    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']

    db.session.commit()

    return redirect(f'/tags/{tag_id}')


@app.route('/tags/new')
def add_tag_form():
    """Shows the form for adding a new tag"""

    return render_template('add-tag.html')


@app.route('/tags/new', methods=["POST"])
def add_tag():
    """Adds the new tag into the database"""

    tag = Tag(name=request.form['name'])
    db.session.add(tag)
    db.session.commit()

    return redirect('/tags')


@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    """Removes tag from the database"""

    Tag.query.filter(Tag.id == tag_id).delete()
    db.session.commit()

    return redirect('/tags')
