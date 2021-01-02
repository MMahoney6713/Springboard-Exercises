from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "superSecret"


@app.route('/')
def home_page():
    instructions = survey.instructions
    title = survey.title
    return render_template('home.html', instructions=instructions, title=title)


@app.route('/clear', methods=["POST"])
def clear_responses():
    session['responses'] = []
    return redirect('/questions/0')


@app.route('/answer', methods=["POST"])
def add_answer():
    answer = request.form['answer']
    responses = session['responses']
    responses.append(answer)
    session['responses'] = responses

    return redirect(f'/questions/{len(responses)}')


@app.route('/questions/<int:question_num>')
def show_question(question_num):

    responses = session['responses']

    if question_num != len(responses):
        flash(f"Invalid question id: {question_num}.")
        return redirect(f'/questions/{len(responses)}')

    if len(survey.questions) == len(responses):
        return redirect('/thanks')

    question = survey.questions[question_num].question
    choices = survey.questions[question_num].choices
    return render_template(
        'questions.html', question_num=question_num, question=question, choices=choices)


@app.route('/thanks')
def thanks():
    responses = session['responses']
    return render_template('thanks.html', responses=responses)
