import React from "react";
import { NavLink } from "react-router-dom";

const Snack = ({name, path}) => {
    return (
        <div>
            <h2>{name}</h2>
            <NavLink exact to="/">Go back</NavLink>
        </div>
    )
}

export default Snack;