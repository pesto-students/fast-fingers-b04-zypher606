import React from 'react';
import "./home.component.css";
import BackgroundComponent from '../background/background.component';

class HomeComponent extends React.Component {
    render() {
        return (
          <>
            <BackgroundComponent></BackgroundComponent>
            <div className="container">
                <div className="row center-align">
                    <div className="col-sm-3">Hwllo 1</div>
                    <div className="col-sm-3">Hwllo 2</div>
                    <div className="col-sm-6">Hwllo 2</div>
                </div>
            </div>
          </>
        );
      }
}

export default HomeComponent;