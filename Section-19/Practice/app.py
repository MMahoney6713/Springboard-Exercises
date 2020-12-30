from flask import Flask, request

app = Flask(__name__)


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


@app.route('/hello')
def say_hello():
    html = """
    <html>
        <body>
            <h1>Hello!</h1>
        </body>
    </html>
    """
    return html


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
