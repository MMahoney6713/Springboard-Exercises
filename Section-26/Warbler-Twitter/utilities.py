from models import User

def get_user(user_id):
    return User.query.get_or_404(user_id)

def get_message(message_id):
    return Message.query.get_or_404(message_id)