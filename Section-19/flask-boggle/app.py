from boggle import Boggle
import os
from flask import Flask, render_template, session, request, redirect, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = "chickens"


boggle_game = Boggle()


# Reset: new board, and clears the saved words
@app.route('/')
def prepare_game():
    """Creates a new game board, resets the high score to 0 and redirects the user to the /play 
    route to render the game template"""

    session['board'] = boggle_game.make_board()
    session['highScore'] = 0
    return redirect('/play')


# Found this https://stackoverflow.com/questions/41144565/flask-does-not-see-change-in-js-file
# Used to fix cache issue with browser, not loading updated static files
def dir_last_updated(folder):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    return str(max(os.path.getmtime(os.path.join(root_path, f))
                   for root_path, dirs, files in os.walk(f"{current_dir}/{folder}")
                   for f in files))


@app.route('/play')
def play_boggle():
    """Renders the template with the game"""

    return render_template('base.html', last_updated=dir_last_updated('static'))


@app.route('/guess')
def check_guess():
    """Receives a guessed word from the user, checks it against the boggle board, and
    returns the result; 'ok', 'not-on-board', or 'not-word'"""

    guess_word = request.args['guess']
    board = session['board']
    check_word = boggle_game.check_valid_word(board, guess_word)
    return jsonify({"result": check_word})


@app.route('/setHighScore', methods=['POST'])
def set_high_score():
    """Receives the high score from the game, compares against the previous high score,
    and then sets the session and returns the resulting highest score between them."""

    new_score = request.json['currentScore']
    current_high_score = session['highScore']
    if new_score > current_high_score:
        current_high_score = new_score
    session['highScore'] = current_high_score
    return jsonify({"highScore": current_high_score})
