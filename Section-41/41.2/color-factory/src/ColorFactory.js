import React, {useState} from "react";
import { Route, Redirect, Switch} from "react-router-dom";
import ColorForm from "./ColorForm";
import Color from "./Color";
import Home from "./Home";

const ColorFactory = () => {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [colors, setColors] = useState([])

    return (
        <div>
            <Switch>
                <Route path="/colors/:name"> 
                    <Color colors={colors}/>
                </Route>
                <Route path="/colors"> 
                    {isFormOpen ?
                        <ColorForm openForm={setIsFormOpen} setColors={setColors}/> :
                        <Home openForm={setIsFormOpen} colors={colors}/>
                    }
                </Route>
                <Redirect to="/colors" />
            </Switch>
        </div>
    )
}

export default ColorFactory;