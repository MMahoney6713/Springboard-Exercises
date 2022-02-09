import React, {useState} from 'react';

const NewBoxForm = ({addBox}) => {
    const INITIAL_STATE = {
        color: '',
        width: '',
        height: ''
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = event => {
        const {name, value} = event.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        addBox(formData);
        setFormData(INITIAL_STATE)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='color'>Color: </label>
            <input 
                id="color"
                type="text"
                name="color"
                placeholder="color"
                value={formData.color}
                onChange={handleChange}
            ></input>

            <label htmlFor='width'>Width: </label>
            <input  
                id="width"
                type="text"
                name="width"
                placeholder="width"
                value={formData.width}
                onChange={handleChange}
            ></input>

            <label htmlFor='height'>Height: </label>
            <input 
                id="height"
                type="text"
                name="height"
                placeholder="height"
                value={formData.height}
                onChange={handleChange}
            ></input>

            <button>Add Box</button>
        </form>
    )
}

export default NewBoxForm;