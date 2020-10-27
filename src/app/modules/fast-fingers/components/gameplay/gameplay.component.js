import React from 'react';
import "./gameplay.component.scss";
import BackgroundComponent from '../background/background.component';
import TimerComponent from '../timer/timer.component';
import logo from '../../../../../assets/img/Icon awesome-keyboard.png';
import startArrow from '../../../../../assets/img/Icon awesome-play.png';

class GameplayComponent extends React.Component {
    render() {
        return (
          <>
            <BackgroundComponent></BackgroundComponent>
            <div className="container">
                {/* <div className="row">
                    <div className="col-sm-6 text-left">
                        
                        <h4><img src={logo} alt="logo"/> PLAYER NAME</h4>
                        <h4><img src={logo} alt="logo"/> LEVEL: MEDIUM</h4>
                    </div>
                    <div className="col-sm-6 text-right">
                        <h4><img src={logo} alt="logo"/> PLAYER NAME</h4>
                        <h4><img src={logo} alt="logo"/> LEVEL: MEDIUM</h4>
                    </div>
                </div> */}
                <br></br>

                <div className="row">
                    <TimerComponent></TimerComponent>
                </div>

             
                <br></br>
                <br></br>
                <br></br>

                <div className="row text-center">
                    <a className="start-game-btn"> <img src={startArrow} alt="start icon" />START GAME</a>
                </div>
            </div>
          </>
        );
      }
}

export default GameplayComponent;