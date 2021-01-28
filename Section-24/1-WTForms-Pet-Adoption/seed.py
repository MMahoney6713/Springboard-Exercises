from models import db, Pet
from app import app

db.drop_all()
db.create_all()

Pet.query.delete()

pet1 = Pet(name="Tammy", species="Dog", age=10)
pet2 = Pet(name="James", species="Cat", age=2, notes="Not very friendly")

db.session.add_all([pet1, pet2])
db.session.commit()
