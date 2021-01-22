from unittest import TestCase

from app import app
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

db.drop_all()
db.create_all()


class UserViewsTestCase(TestCase):
    """Tests for views for Users"""

    def setUp(self):
        """Add sample users"""

        User.query.delete()

        self.client = app.test_client()

        test_user = User(first_name="Test", last_name="User")
        db.session.add(test_user)
        db.session.commit()

        self.user_id = test_user.id

    def tearDown(self):
        """Clean up any fouled transaction"""

        db.session.rollback()

    def test_list_users(self):
        """list_users should return a list of users"""

        with self.client:
            response = self.client.get("/users")

            self.assertEqual(response.status_code, 200)
            self.assertIn(b'Test User', response.data)

    def test_user_info(self):
        """user_info should return information about the specific user, including buttons to edit or delete"""

        with self.client:
            response = self.client.get(f'/users/{self.user_id}')
            html = response.get_data(as_text=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn('<h1>Test User</h1>', html)
            self.assertIn(f'/users/{self.user_id}/delete', html)
            self.assertIn(f'/users/{self.user_id}/edit', html)

    def test_new_user_post(self):
        """Should return response with new user created"""

        with self.client:
            user_info = {"first-name": "Michael",
                         "last-name": "Mahoney", "img-url": ""}
            response = self.client.post(
                '/users/new', data=user_info, follow_redirects=True)

            self.assertEqual(response.status_code, 200)
            self.assertIn(b"Michael Mahoney", response.data)

    def test_delete_user(self):
        """Should return response with user information removed"""

        with self.client:
            response = self.client.post(
                f'/users/{self.user_id}/delete', follow_redirects=True)

            self.assertEqual(response.status_code, 200)
            self.assertNotIn(b'Test User', response.data)
