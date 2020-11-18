import React from 'react';
import "./background.component.css";

class BackgroundComponent extends React.Component {
    render() {
        return (
            <>
                <div className="background">
                    <div className="bg-layer-1"></div>
                    <div className="bg-layer-2"></div>
                </div>
            </>
        );
      }
}

export default BackgroundComponent;