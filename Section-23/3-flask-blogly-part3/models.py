"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database"""

    db.app = app
    db.init_app(app)


class User(db.Model):
    """User Model"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(15), nullable=False)
    last_name = db.Column(db.String(15))
    image_url = db.Column(db.String(200),
                          default="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png")

    posts = db.relationship('Post', backref='user', passive_deletes=True)

    def __repr__(self):
        """Show user info"""

        u = self
        return f"<User {u.id}: {u.first_name} {u.last_name}>"

    def get_full_name(self):
        """Show user's full name"""

        u = self
        return f"{u.first_name}" if u.last_name == "None" else f"{u.first_name} {u.last_name}"

    full_name = property(get_full_name)


class Post(db.Model):
    """Post Model"""

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(20), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete='CASCADE'), nullable=False)

    tags = db.relationship('Tag', secondary="posts_tags",
                           backref='posts', passive_deletes=True)


class PostTag(db.Model):
    """PostTag Model"""

    __tablename__ = 'posts_tags'

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id', ondelete='CASCADE'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(
        'tags.id', ondelete='CASCADE'), primary_key=True)


class Tag(db.Model):
    """Tag Model"""

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20), unique=True)
