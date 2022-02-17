import React from "react";
import { useState } from "react";

const ColorForm = ({openForm, setColors}) => {
    const INITIAL_STATE = {
        name: '',
        value: ''
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
        setColors(colors => [
            formData,
            ...colors
        ]);
        setFormData(INITIAL_STATE);
        openForm(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input
                id='name'
                type='text'
                name='name'
                placeholder='Name of color'
                value={formData.name}
                onChange={handleChange}            
            ></input>
            <input
                id='value'
                type='color'
                name='value'
                value={formData.value}
                onChange={handleChange}            
            ></input>
            <button>Add color</button>
        </form>
    )
}

export default ColorForm;