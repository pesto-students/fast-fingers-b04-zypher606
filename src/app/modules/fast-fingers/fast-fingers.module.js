import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeComponent from "./components/home/home.component";
import GameplayComponent from './components/gameplay/gameplay.component';

function FastFingers(props) {
    return (
        <Router basename={props.match.path}>
            <Route exact path="/" component={ HomeComponent } />
            <Route exact path="/gameplay" component={ GameplayComponent } />
            {/* <Redirect from="**" to="/" /> */}
        </Router>
    );
}

export default FastFingers;