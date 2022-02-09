import React, {useState} from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';

const TodoList = () => {
    const [todoArray, setTodoArray] = useState([]);

    const addTodo = (text) => {
        setTodoArray(todoArray => ([
            ...todoArray,
            text
        ]))
    }

    const removeTodo = (text) => {
        const newTodoArray = todoArray.filter(todo => todo.text !== text);
        setTodoArray(newTodoArray);
    }

    return (
        <>
            <NewTodoForm addTodo={addTodo}/>
            <div className="TodoList">
                {todoArray.map(todo => (
                    <Todo text={todo.text} removeTodo={removeTodo} key={todo.text}/>
                ))}
            </div>
        </>
        
    )
}

export default TodoList;