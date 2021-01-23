from unittest import TestCase

from app import app
from models import db, User, Post
from datetime import datetime

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()


class UserModelTestCase(TestCase):
    """Tests for model for Users"""

    def tearDown(self):
        """Clean up any transaction history"""

        db.session.rollback()

    def test_repr(self):
        """__repr__ should return appropriate string representation"""

        test_user = User(first_name="Test", last_name="User",
                         image_url="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png")
        db.session.add(test_user)
        db.session.commit()
        self.assertEquals(f"{test_user}", f"<User {test_user.id}: Test User>")

    def test_get_full_name(self):
        """get_full_name should return appropriate full name"""

        test_user = User(first_name="Test", last_name="User",
                         image_url="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png")
        self.assertEquals(test_user.get_full_name(), "Test User")


class PostModelTestCase(TestCase):
    """Tests for the Post model"""

    def tearDown(self):
        """Clean up any transaction history"""

        db.session.rollback()

    def test_relationship(self):
        """Tests that relationship between Post and User is set up"""

        test_user = User(first_name="Test", last_name="User",
                         image_url="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png")
        db.session.add(test_user)
        db.session.commit()

        test_post = Post(title="What's up", content="Not much",
                         created_at=datetime.now(), user_id=test_user.id)
        db.session.add(test_post)
        db.session.commit()

        self.assertEquals(f'{test_post.user.full_name}', 'Test User')
