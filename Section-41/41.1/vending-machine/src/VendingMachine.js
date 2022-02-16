import React from "react";
import { Route , NavLink} from "react-router-dom";
import Snack from "./Snack";

const VendingMachine = () => {
    return (
        <div>
            <h1>VendingMachine</h1>
            <NavLink exact to="/chips">chips</NavLink>
            <NavLink exact to="/soda">soda</NavLink>
            <NavLink exact to="/water">water</NavLink>
            <Route exact path={'/chips'}>
                <Snack name={'Chips'}/>
            </Route>
            <Route exact path={'/soda'}>
                <Snack name={'Soda'}/>
            </Route>
            <Route exact path={'/water'}>
                <Snack name={'Water'}/>
            </Route>
            
        </div>
    )
    
}

export default VendingMachine;