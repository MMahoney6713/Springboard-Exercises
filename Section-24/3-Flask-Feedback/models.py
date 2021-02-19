from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bycrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)


class Users(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.String(20), primary_key=True, nullable=False)
    password = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    @classmethod
    def register(cls, username, password, email, first_name, last_name):

        hashed_pass = bycrypt.generate_password_hash(password)
        hashed_pass = hashed_pass.decode("utf8")

        return cls(username=username, password=hashed_pass, email=email, first_name=first_name, last_name=last_name)
    
