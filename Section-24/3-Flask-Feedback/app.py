from flask import Flask, render_template, redirect, session, flash
from models import connect_db, db, Users
from forms import UserForm
from secret import set_secret_key

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgres:///flask_feedback"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True

connect_db(app)
set_secret_key(app)

@app.route('/', methods=['GET', 'POST'])
@app.route('/register', methods=['GET', 'POST'])
def register_user():

    form = UserForm()

    if form.validate_on_submit():
        username, password, email, first_name, last_name = parse_user_form(form)
        new_user = Users.register(username=username, password=password, 
                                email=email, first_name=first_name, last_name=last_name)
        db.session.add(new_user)
        db.session.commit()
        return redirect('/secret')
    
    return render_template('register.html', form=form)

def parse_user_form(form):
    username = form.username.data
    password = form.password.data
    email = form.email.data
    first_name = form.first_name.data
    last_name = form.last_name.data
    return username, password, email, first_name, last_name