from models import User

def get_user(user_id):
    return User.query.get_or_404(user_id)