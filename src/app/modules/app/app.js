import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import FastFingers from '../fast-fingers/fast-fingers.module';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  return (
    <Router basename={'/'}>
      <Switch>
        <Redirect exact from="/" to="fast-fingers" />
        <Route path="/fast-fingers" children={ FastFingers } />
        <Redirect from="**" to="/fast-fingers" />

        {/* Load the required modules accordingly below */}
      </Switch>
    </Router>
  );
}

export default App;
