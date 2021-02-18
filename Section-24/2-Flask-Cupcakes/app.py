from flask import Flask, render_template, redirect, jsonify, request
from models import db, connect_db, Cupcakes

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False


connect_db(app)
db.create_all()

@app.route('/')
def show_homepage():
    return render_template('index.html')



##### RESTful Routes for Cupcakes #####

@app.route('/api/cupcakes')
def list_cupcakes():
    
    all_cupcakes = Cupcakes.query.all()
    serialized_cupcakes = [serialize_cupcake(cupcake) for cupcake in all_cupcakes]

    return jsonify(cupcakes=serialized_cupcakes)


@app.route('/api/cupcakes/<int:cupcake_id>')
def get_cupcake(cupcake_id):

    cupcake = Cupcakes.query.get_or_404(cupcake_id)

    return jsonify(cupcake=serialize_cupcake(cupcake))


@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():

    flavor, size, rating, image = parse_cupcake_JSON(request.json)
    cupcake = Cupcakes(flavor=flavor, size=size, rating=rating, image=image)

    db.session.add(cupcake)
    db.session.commit()

    return (jsonify(cupcake=serialize_cupcake(cupcake)), 201)


@app.route('/api/cupcakes/<int:cupcake_id>', methods=["PATCH"])
def patch_cupcake(cupcake_id):

    cupcake = Cupcakes.query.get_or_404(cupcake_id)
    update_cupcake(cupcake, request.json)

    db.session.commit()

    return jsonify(cupcake=serialize_cupcake(cupcake))


@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def delete_cupcake(cupcake_id):

    cupcake = Cupcakes.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message="Deleted")




##### Cupcakes Helper Functions #####

def serialize_cupcake(cupcake):
    return {
        "id": cupcake.id,
        "flavor": cupcake.flavor,
        "size": cupcake.size,
        "rating": cupcake.rating,
        "image": cupcake.image
    }

def parse_cupcake_JSON(cupcake_JSON):
    flavor = cupcake_JSON['flavor']
    size = cupcake_JSON['size']
    rating = cupcake_JSON['rating']
    image = cupcake_JSON.get('image', '')
    
    return flavor, size, rating, image

def update_cupcake(cupcake_obj, request_data):
    cupcake_obj.flavor = request_data.get('flavor', cupcake_obj.flavor)
    cupcake_obj.size = request_data.get('size', cupcake_obj.size)
    cupcake_obj.rating = request_data.get('rating', cupcake_obj.rating)
    cupcake_obj.image = request_data.get('image', cupcake_obj.image)