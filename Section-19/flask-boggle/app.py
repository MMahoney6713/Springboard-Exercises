from boggle import Boggle
import os
from flask import Flask, render_template, session, request, redirect, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = "chickens"


boggle_game = Boggle()
WORDS = set()


# Reset: new board, and clears the saved words
@app.route('/')
def show_board():
    boggle_game = Boggle()
    session['board'] = boggle_game.make_board()
    WORDS.clear()
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
    return render_template('base.html', last_updated=dir_last_updated('static'))


@app.route('/guess', methods=['POST'])
def check_guess():
    guess_word = request.json['guess']
    board = session['board']
    check_word = boggle_game.check_valid_word(board, guess_word)
    if check_word == 'ok':
        WORDS.add(guess_word)
    return jsonify({"result": check_word, "board": board})


@ app.route('/apiTest')  # , methods=['POST'])
def testAPI():
    greeting = {"greeting": "hello, good job!"}
    return jsonify(greeting)
