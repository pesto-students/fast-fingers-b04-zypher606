import React from 'react';
import "./home.component.scss";
import BackgroundComponent from '../background/background.component';
import logo from '../../../../../assets/img/Icon awesome-keyboard.png';
import startArrow from '../../../../../assets/img/Icon awesome-play.png';

class HomeComponent extends React.Component {
    render() {
        return (
          <>
            <BackgroundComponent></BackgroundComponent>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 intro-header">
                        <img src={logo} alt="logo"/>
                        <h3>fast fingers</h3>
                        <h4>the ultimate typing game</h4>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col-sm-12 text-center">
                        <input className="textbox-username" type="text" name="username" placeholder="TYPE YOUR NAME"/>
                    </div>
                    <div className="col-sm-12 text-center">
                        <select className="select-difficulty" name="cars" id="cars">
                            <option value="" selected disabled>DIFFICULTY LEVEL</option>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>                    
                    </div>
                </div>

                <br></br>
                <br></br>
                <br></br>

                <div className="row text-center">
                    <a href="javascript:void(0)" className="start-game-btn"> <img src={startArrow} alt="start icon" />START GAME</a>
                </div>
            </div>
          </>
        );
      }
}

export default HomeComponent;