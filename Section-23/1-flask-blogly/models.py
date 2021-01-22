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

    # Hey Mesut, why would I want to use the property function here and make a class property?
    # Wouldn't there be something like the Constructor that would do this?
