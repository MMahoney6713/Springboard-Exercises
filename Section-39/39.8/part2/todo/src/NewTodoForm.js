import React, {useState} from 'react';

const NewTodoForm = ({addTodo}) => {
    const INITIAL_STATE = {
        text: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = event => {
        const {name, value} = event.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        addTodo(formData);
        setFormData(INITIAL_STATE);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='text'>Todo Text:</label>
            <input
                id='text'
                type='text'
                name='text'
                placeholder='Todo Description:'
                value={formData.text}
                onChange={handleChange}            
            ></input>
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodoForm;