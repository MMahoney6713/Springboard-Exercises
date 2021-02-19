from app import app
from models import db, Users, Feedback

db.drop_all()
db.create_all()

user1 = Users.register(
    username="mikemahoney",
    first_name="mike",
    last_name="mahoney",
    email="mrm257@cornell.edu",
    password="hello"
)

db.session.add(user1)
db.session.commit()

feedback1 = Feedback(
    title="Feedback",
    content="Just a little bit of feedback",
    username="mikemahoney"
)

feedback2 = Feedback(
    title="More feedback",
    content="Some more feedback for you.",
    username="mikemahoney"
)

db.session.add_all([feedback1, feedback2])
db.session.commit()