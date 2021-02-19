from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.html5 import EmailField
from wtforms.validators import InputRequired, Length

class UserRegisterForm(FlaskForm):
    username = StringField("Username", 
        validators=[InputRequired(), Length(max=20, message="Username must be under 20 characters long")])
    password = PasswordField("Password", validators=[InputRequired()])
    email = EmailField("Email", 
        validators=[InputRequired(), Length(max=50, message="Email must be under 50 characters long")])
    first_name = StringField("First Name", 
        validators=[InputRequired(), Length(max=30, message="First Name must be under 30 characters long")])
    last_name = StringField("Last Name", 
        validators=[InputRequired(), Length(max=30, message="Last Name must be under 30 characters long")])


class UserLoginForm(FlaskForm):
    username = StringField("Username", 
        validators=[InputRequired(), Length(max=20, message="Username must be under 20 characters long")])
    password = PasswordField("Password", validators=[InputRequired()])


class FeedbackForm(FlaskForm):
    title = StringField("Title", 
        validators=[InputRequired(), Length(max=100, message="Username must be under 20 characters long")])
    content = StringField("Content", validators=[InputRequired()])