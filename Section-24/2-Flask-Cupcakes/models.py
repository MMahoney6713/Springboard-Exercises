from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_cupcake_url = 'https://tinyurl.com/demo-cupcake'

def connect_db(app):
    """Connect to database"""

    db.app = app
    db.init_app(app)

class Cupcakes(db.Model):
    __tablename__ = "cupcakes"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    image = db.Column(db.Text, nullable=False, default=default_cupcake_url)


    
    