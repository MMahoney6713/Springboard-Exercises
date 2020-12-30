from flask import Flask, request, render_template
from stories import *

app = Flask(__name__)


@app.route('/')
def home_page():
    story_prompts = story.prompts
    return render_template('home.html', prompts=story_prompts)


@app.route('/story')
def story_page():
    story_args = request.args
    story_complete = story.generate(story_args)
    return render_template('story.html', story_complete=story_complete)
