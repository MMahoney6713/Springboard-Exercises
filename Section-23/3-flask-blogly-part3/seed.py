"""Seed file to make sample data for blogly db."""

from models import User, db, Post, Tag, PostTag
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

# Create sample tags
tag1 = Tag(name="funny")
tag2 = Tag(name="scary")

# Create sample posts_tags
post_tag1 = PostTag(post_id=1, tag_id=1)
post_tag2 = PostTag(post_id=1, tag_id=2)
post_tag3 = PostTag(post_id=2, tag_id=1)

db.session.add_all([user1, user2, user3])
db.session.commit()

db.session.add_all([post1, post2, post3, tag1, tag2])
db.session.commit()

db.session.add_all([post_tag1, post_tag2, post_tag3])
db.session.commit()
