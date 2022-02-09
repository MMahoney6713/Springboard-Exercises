import React from 'react';

const Todo = ({text, removeTodo}) => {
    const handleRemove = () => {
        removeTodo(text)
    }
    
    return (
        <div>
            <p>{text}</p>
            <button onClick={handleRemove}>X</button>
        </div>
    )
}

export default Todo;