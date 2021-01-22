"""Seed file to make sample data for blogly db."""

from models import User, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

# Add sample users
sample1 = User(first_name='Michael', last_name="Mahoney")
sample2 = User(first_name='John',
               image_url="https://i2-prod.mirror.co.uk/incoming/article7367572.ece/ALTERNATES/s615b/PAY-Toby.jpg")
sample3 = User(first_name="Jen", last_name="Johnson")

# Add new objects to session, so they'll persist
db.session.add(sample1)
db.session.add(sample2)
db.session.add(sample3)

# Commit--otherwise, this never gets saved!
db.session.commit()
