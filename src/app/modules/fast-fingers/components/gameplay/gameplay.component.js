import React from 'react';
import "./gameplay.component.scss";
import BackgroundComponent from '../background/background.component';
import TimerComponent from '../timer/timer.component';
import startArrow from '../../../../../assets/img/Icon awesome-play.png';
import dictionary from "../../mock-data/dictionary.json";

class GameplayComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            result: '',
            target: 'HELLO',
        }

        this.dictionary = dictionary;

        this.timeup = this.timeup.bind(this);
        this.validateResult = this.validateResult.bind(this);
    }

    getRandomWord() {
        return this.dictionary[Math.floor(Math.random() * this.dictionary.length)].toUpperCase();
    } 

    handleAnswerChange(event) {
        let res = event.target.value.toString().toUpperCase();
        this.setState({result: res});

        this.validateResult(res);
    }

    timeup() {
        this.setState({result: ''});     
    }

    validateResult(result) {
        console.log(this.state.target, result)
        if (this.state.target === result) {
            this.setState({result: ''});
            this.timerRef.stopTimer();
            this.timerRef.startTimer();
        }
    }

    onClick = () => {
        this.timerRef.method() // do stuff
    }

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
                    <TimerComponent
                        onRef={ref => (this.timerRef = ref)}
                        timeup={this.timeup}>
                    </TimerComponent>
                </div>

                <div className="row">
                    <div className="col-sm-12 text-center">
                        <h4 className="target-text">{this.getRandomWord()}</h4>
                        <input value={this.state.result} onChange={(e) => {this.handleAnswerChange(e)}} className="textbox-user-input" type="text" name="username" placeholder="TYPE YOUR NAME"/>
                    </div>
                </div>

             
                <br></br>
                <br></br>
                <br></br>

                <div className="row text-center">
                    <a onClick={this.onClick} className="start-game-btn"> <img src={startArrow} alt="start icon" />START GAME</a>
                </div>
            </div>
          </>
        );
      }
}

export default GameplayComponent;