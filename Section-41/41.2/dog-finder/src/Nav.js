import React from "react";
import { NavLink } from "react-router-dom";
import { v4 as uuid } from 'uuid';

const Nav = ({dogs}) => {
    return (
        <nav className="NavBar">
            {dogs.map(dog => (
                    <NavLink exact to={`dogs/${dog.src}`} key={uuid()}>
                        {dog.name}
                    </NavLink>
                )
            )}
        </nav>
    )
}

export default Nav;