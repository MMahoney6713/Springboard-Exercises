
from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)


@app.route('/add')
def add_route():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return f"{add(a, b)}"


@app.route('/sub')
def sub_route():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return f"{sub(a, b)}"


@app.route('/mult')
def mult_route():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return f"{mult(a, b)}"


@app.route('/div')
def div_route():
    a = int(request.args['a'])
    b = int(request.args['b'])
    return f"{div(a, b)}"


OPERATIONS = {
    "add": add,
    "sub": sub,
    "div": div,
    "mult": mult
}


@app.route('/math/<op_type>')
def math_route(op_type):
    math_op = OPERATIONS[op_type]
    a = int(request.args['a'])
    b = int(request.args['b'])
    return f"{math_op(a, b)}"
