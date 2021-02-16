from flask import Flask, render_template, redirect
from models import db, connect_db, Pet
from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'f3cfe9ed8fae309f02079dbf'

connect_db(app)
db.create_all()


@app.route('/')
def list_all_pets():

    pets = Pet.query.all()

    return render_template('homepage.html', pets=pets)


@app.route('/add', methods=["GET", "POST"])
def add_pet():

    form = AddPetForm()

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        photo_url = form.photo_url.data
        age = form.age.data
        notes = form.notes.data
        db.session.add(Pet(name=name, species=species, age=age, photo_url=photo_url, notes=notes))
        db.session.commit()
        return redirect('/')
    else:
        return render_template('add-pet-form.html', form=form)

@app.route('/<int:pet_id>', methods=["GET","POST"])
def show_and_edit_pet(pet_id):

    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)
    
    if form.validate_on_submit():
        pet.photo_url = form.photo_url.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        db.session.commit()
        return redirect('/')
    return render_template('edit-pet-form.html', form=form, pet=pet)