import React from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

const BoxList = () => {
    const [boxArray, setBoxArray] = useState([])

    const addBox = ({color, width, height}) => {
        setBoxArray(boxArray => ([
            ...boxArray,
            {
                id: uuid(),
                color: color,
                width: parseInt(width),
                height: parseInt(height)
            }
        ]))
    }

    const removeBox = (id) => {
        const newBoxArray = boxArray.filter(box => box.id !== id)
        setBoxArray(newBoxArray);
    }

    return (
        <div className='BoxList'>
            <NewBoxForm addBox={addBox}/>
            {boxArray.map(box => (
                <div key={box.id}>
                    <Box 
                        color={box.color} 
                        width={box.width} 
                        height={box.height} 
                    />
                    <button onClick={() => removeBox(box.id)}>X</button>
                </div>
            ))}
        </div>
    )
}

export default BoxList;