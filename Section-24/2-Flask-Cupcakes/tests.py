from unittest import TestCase

from app import app
from models import db, Cupcakes

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

db.drop_all()
db.create_all()


CUPCAKE_DATA = {
    "flavor": "TestFlavor",
    "size": "TestSize",
    "rating": 5,
    "image": "http://test.com/cupcake.jpg"
}

CUPCAKE_DATA_2 = {
    "flavor": "TestFlavor2",
    "size": "TestSize2",
    "rating": 10,
    "image": "http://test.com/cupcake2.jpg"
}

CUPCAKE_DATA_PATCH = {
    "flavor": "PatchFlavor",
    "size": "PatchSize",
    "rating": 7,
    "image": "http://test.com/cupcake3.jpg"
}


class CupcakeViewsTestCase(TestCase):
    """Tests for views of API."""

    def setUp(self):
        """Make demo data."""

        cupcake = Cupcakes(**CUPCAKE_DATA)
        db.session.add(cupcake)
        db.session.commit()

        self.cupcake = cupcake

    def tearDown(self):
        """Clean up fouled transactions."""

        Cupcakes.query.delete()
        db.session.rollback()

    def test_list_cupcakes(self):

        with app.test_client() as client:
            response = client.get("/api/cupcakes")
            data = response.json

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data, {
                "cupcakes": [
                    {
                        "id": self.cupcake.id,
                        "flavor": "TestFlavor",
                        "size": "TestSize",
                        "rating": 5,
                        "image": "http://test.com/cupcake.jpg"
                    }
                ]
            })

    def test_get_cupcake(self):
        
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            response = client.get(url)
            data = response.json

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data, {
                "cupcake": {
                    "id": self.cupcake.id,
                    "flavor": "TestFlavor",
                    "size": "TestSize",
                    "rating": 5,
                    "image": "http://test.com/cupcake.jpg"
                }
            })

    def test_create_cupcake(self):
        
        with app.test_client() as client:
            url = "/api/cupcakes"
            response = client.post(url, json=CUPCAKE_DATA_2)
            data = response.json

            # don't know what ID we'll get, make sure it's an int & normalize
            self.assertIsInstance(data['cupcake']['id'], int)
            del data['cupcake']['id']

            self.assertEqual(response.status_code, 201)
            self.assertEqual(data, {
                "cupcake": {
                    "flavor": "TestFlavor2",
                    "size": "TestSize2",
                    "rating": 10,
                    "image": "http://test.com/cupcake2.jpg"
                }
            })

            self.assertEqual(Cupcakes.query.count(), 2)

    def test_patch_cupcake(self):
        
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            response = client.patch(url, json=CUPCAKE_DATA_PATCH)
            data = response.json

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data, {
                "cupcake": {
                    "id": self.cupcake.id,
                    "flavor": "PatchFlavor",
                    "size": "PatchSize",
                    "rating": 7,
                    "image": "http://test.com/cupcake3.jpg"
                }
            })

    def test_delete_cupcake(self):
        
        with app.test_client() as client:
            url = f"/api/cupcakes/{self.cupcake.id}"
            response = client.delete(url)
            data = response.json

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data, {"message": "Deleted"})
            self.assertIsNone(Cupcakes.query.get(self.cupcake.id))


