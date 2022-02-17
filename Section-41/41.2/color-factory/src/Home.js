import React from "react";
import { Link } from "react-router-dom";


const Home = ({openForm, colors}) => {
    const handleClick = () => {
        openForm(true)
    }

    return (
        <div>
            <h1>Welcome to the color factory</h1>
            <button onClick={handleClick}>Add a color</button>
            <h3>Please select a color</h3>
            <ul>
                {colors.map(color => {
                    return (
                        <li key={color.name}>
                            <Link to={`/colors/${color.name}`}>{color.name}</Link>
                        </li>
                    )
                })}
            </ul>
            
        </div>
    )
}

export default Home;