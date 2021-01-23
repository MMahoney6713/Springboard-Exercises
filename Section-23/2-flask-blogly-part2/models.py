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
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', backref='posts')
