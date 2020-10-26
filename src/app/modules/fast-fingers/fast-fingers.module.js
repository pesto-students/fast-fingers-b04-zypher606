import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HomeComponent from "./components/home/home.component";

function FastFingers(props) {
    return (
        <Router basename={props.match.path}>
            <Route exact path="/" component={ HomeComponent } />
            <Redirect from="**" to="/" />
        </Router>
    );
}

export default FastFingers;