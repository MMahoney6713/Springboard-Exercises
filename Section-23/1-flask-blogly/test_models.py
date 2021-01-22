from unittest import TestCase

from app import app
from models import db, User

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
        self.assertEquals(f"{test_user}", "<User 1: Test User>")

    def test_get_full_name(self):
        """get_full_name should return appropriate full name"""

        test_user = User(first_name="Test", last_name="User",
                         image_url="https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png")
        self.assertEquals(test_user.get_full_name(), "Test User")
