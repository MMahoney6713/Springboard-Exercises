from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = "superSecret"

RESPONSES = []


@app.route('/')
def home_page():
    instructions = survey.instructions
    title = survey.title
    return render_template('home.html', instructions=instructions, title=title)


@app.route('/clear', methods=["POST"])
def clear_responses():
    RESPONSES.clear()
    return redirect('/questions/0')


@app.route('/answer', methods=["POST"])
def add_answer():
    answer = request.form['answer']
    RESPONSES.append(answer)
    return redirect(f'/questions/{len(RESPONSES)}')


@app.route('/questions/<int:question_num>')
def show_question(question_num):

    # if len(RESPONSES) == 0:
    #     return redirect('/')

    if question_num != len(RESPONSES):
        flash(f"Invalid question id: {question_num}.")
        return redirect(f'/questions/{len(RESPONSES)}')

    if len(survey.questions) == len(RESPONSES):
        return redirect('/thanks')

    question = survey.questions[question_num].question
    choices = survey.questions[question_num].choices
    return render_template(
        'questions.html', question_num=question_num, question=question, choices=choices)


@app.route('/thanks')
def thanks():
    return render_template('thanks.html', responses=RESPONSES)
