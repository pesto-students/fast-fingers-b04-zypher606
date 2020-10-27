import React from 'react';
import "./home.component.css";
import BackgroundComponent from '../background/background.component';

class HomeComponent extends React.Component {
    render() {
        return (
            <>
            <BackgroundComponent></BackgroundComponent>
             <div className="container">
                yes
             </div>
            </>
        );
      }
}

export default HomeComponent;