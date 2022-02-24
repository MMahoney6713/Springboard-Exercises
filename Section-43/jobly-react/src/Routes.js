import React from "react";
import {Route, Link, Switch} from "react-router-dom";
import { capitalizeFirst } from "./helpers";

import Home from "./Home";
import NotFound from "./NotFound";
import Listings from "./Listings";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Job from "./Job";

const Routes = ({joblyState}) => {
    return (
        <>
            <Switch>
                <Route exact path="/companies/:handle">
                    <Company />
                </Route>
                <Route exact path="/companies">
                    <Companies joblyState={joblyState}/>
                </Route>
                <Route exact path="/jobs/:id">
                    <Job />
                </Route>
                <Route exact path="/jobs">
                    <Jobs content='jobs' joblyState={joblyState}/>
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
            
        </>
    )
    
}

export default Routes;