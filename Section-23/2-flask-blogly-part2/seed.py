"""Seed file to make sample data for blogly db."""

from models import User, db, Post
from app import app
from datetime import datetime

db.drop_all()
db.create_all()

User.query.delete()

# Create sample users
user1 = User(first_name='Michael', last_name="Mahoney")
user2 = User(first_name='John',
             image_url="https://i2-prod.mirror.co.uk/incoming/article7367572.ece/ALTERNATES/s615b/PAY-Toby.jpg")
user3 = User(first_name="Jen", last_name="Johnson")

# Create sample posts
post1 = Post(title="What's up", content="Not much",
             created_at=datetime.now(), user_id=1)
post2 = Post(title="Check this out", content="JK",
             created_at=datetime.now(), user_id=1)
post3 = Post(title="Did you see this?", content="Oops",
             created_at=datetime.now(), user_id=3)


db.session.add_all([user1, user2, user3])
db.session.commit()

db.session.add_all([post1, post2, post3])
db.session.commit()
