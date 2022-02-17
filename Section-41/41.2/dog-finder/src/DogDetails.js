import React from "react";
import { useParams, NavLink } from "react-router-dom";

const DogDetails = ({dogs}) => {
    const { name } = useParams();
    const dog = dogs.filter(dog => dog.name.toLowerCase() === name)[0];
    
    return (
        <div>
            <h2>{dog.name}</h2>
            <h3>Age: {dog.age}</h3>
            <NavLink exact to='/dogs'>Go Back</NavLink>
        </div>
    )
}

export default DogDetails;