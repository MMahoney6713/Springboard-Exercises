from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from random import randint, choice

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickens"
debug = DebugToolbarExtension(app)


@app.route('/')
def home_page():
    html = """
    <html>
        <body>
            <h1>Welcome to my simple app!</h1>
            <a href='/hello'>Go to my hello page</a>
        </body>
    </html>
    """
    return html


@app.route('/form')
def show_form():
    return render_template('form.html')


COMPLIMENTS = ["cool", "awesome", "pretty"]


@app.route('/greet')
def get_greeting():
    username = request.args["username"]
    compliment = choice(COMPLIMENTS)
    return render_template('greet.html', username=username, compliment=compliment)


@app.route('/lucky')
def lucky_number():
    num = randint(1, 20)
    return render_template('lucky.html', lucky_num=num, msg='you are so lucky')


@app.route('/hello')
def say_hello():
    return render_template("hello.html")


@app.route('/goodbye')
def say_goodbye():
    return "goodbye!"


@app.route('/search')
def search():
    term = request.args["term"]
    return f"<h1>Search results for: {term}</h1>"

# @app.route('/so and so', methods = ["POST"])
#     comment = request.form["form_element_name"]


# @app.route('/r/<subreddit>')
# def show_subreddit(subreddit):
#     return "THIS IS A SUBREDDIT"


# POSTS = {
#     1: "tsucha",
#     2: "sdokfeh",
#     3: "lskdfdf",
# }

# Can also have <categories>/<posts>/<id> etc etc
# @app.route('/posts/<int:id>')
# def find_post(id):
#     post = POSTS.get(id, "Post not found")
#     return f"{post}"
