from boggle import Boggle
from flask import Flask, render_template, session, request, redirect

app = Flask(__name__)
app.config['SECRET_KEY'] = "chickens"

boggle_game = Boggle()
board = boggle_game.make_board()


@app.route('/')
def show_board():
    session['board'] = board
    session['words'] = []
    return redirect('/play')


@app.route('/play')
def play_boggle():
    return render_template('base.html')


@app.route('/guess', methods=['POST'])
def check_guess():
    guess_word = request.form['guess']
    if boggle_game.check_valid_word(board, guess_word) == 'ok':
        words = session['words']
        words.append(guess_word)
        session['words'] = words
    return redirect('/play')
