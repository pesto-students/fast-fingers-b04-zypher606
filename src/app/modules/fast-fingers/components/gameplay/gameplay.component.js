import React from 'react';
import "./gameplay.component.scss";
import BackgroundComponent from '../background/background.component';
import TimerComponent from '../timer/timer.component';
import dictionary from "../../mock-data/dictionary.json";
import iconPerson from '../../../../../assets/img/Icon material-person.png';
import iconGamepad from '../../../../../assets/img/Icon awesome-gamepad.png';

class GameplayComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            result: '',
            target: 'HELLO',
            difficultyLevel: 1, // 1 => easy, 2 => medium, 3 => Hard
            difficultyFactor: 1,  // 1 => easy, 1.5 => Med, 2 => Hard
            gameOver: false,
            score: 0,
        }

        this.dictionary = dictionary;

        this.timeup = this.timeup.bind(this);
        this.validateResult = this.validateResult.bind(this);
        // this.playAgain = this.playAgain.bind(this);
        this.startGameplay = this.startGameplay.bind(this);

        // this.child = React.createRef();

        // this.child = this.child.bind(this);
    }

    componentDidMount() {
        this.startGameplay();
    }

    startGameplay() {
        const targetStr = this.getRandomWord(1);
        this.setState({target: targetStr});
        this.refs.child.startTimer(2);

        this.scoreCounter = setInterval(() => {
            this.setState({score: this.state.score + 1});
        }, 1000);
    }

    continueGameplay() {
        const targetStr = this.getRandomWord(1);
        this.setState({target: targetStr});
        this.refs.child.startTimer(2);
    }


    getRandomWord(level) {
        let dictionary;
        if (level === 1) {
            dictionary = this.dictionary.filter(d => d.length <= 4);
        } else if (level === 2) {
            dictionary = this.dictionary.filter(d => d.length >=  5 && d.length <= 8);
        } else if (level === 3) {
            dictionary = this.dictionary.filter(d => d.length > 8);
        }

        return dictionary[Math.floor(Math.random() * dictionary.length)].toUpperCase();

    }

    handleAnswerChange(event) {
        let res = event.target.value.toString().toUpperCase();
        this.setState({result: res});

        this.validateResult(res);
    }

    timeup() {
        this.setState({result: '', gameOver: true});
        clearTimeout(this.scoreCounter);
    }

    validateResult(result) {
        console.log(this.state.target, result)
        if (this.state.target === result) {
            this.setState({result: ''});
            this.continueGameplay();
        }
    }

    onClick = () => {
        this.child.method(); // do stuff
    }

    playAgain() {
        // this.startGameplay();
        // this.child.method()
        // this.child.current.startTimer(2);
        window.location.reload(false);
    }

    // playAgain = () => {
    //     this.refs.child.getWrappedInstance().startTimer(2);
    //     // this.child.current.startTimer(2);
    // };

    render() {
        // const playAgain = () => {
        //     this.startGameplay().bind(this);
        // };
        return (
          <>
            <BackgroundComponent></BackgroundComponent>
            <div className="container">
                <div className="row header-container">
                    <div className="col-sm-6 text-left">
                        
                        <h4><img src={iconPerson} alt="logo"/> PLAYER NAME</h4>
                        <h4><img src={iconGamepad} alt="logo"/> LEVEL : MEDIUM</h4>
                    </div>
                    <div className="col-sm-6 text-right">
                        <h4>fast fingers</h4>
                        <h4>SCORE: {this.state.score}</h4>
                    </div>
                </div>
                <br></br>

                {   
                    this.state.gameOver === false && 
                    <div className="row inprogress">
                        <TimerComponent
                            ref="child" 
                            // onRef={ref => (this.child = ref)}
                            timeup={this.timeup}>
                        </TimerComponent>

                        <div className="col-sm-12 text-center">
                            <h4 className="target-text">{this.state.target}</h4>
                            <input autoFocus value={this.state.result} onChange={(e) => {this.handleAnswerChange(e)}} className="textbox-user-input" type="text" name="username" placeholder="TYPE YOUR NAME"/>
                        </div>

                        <div className="col-sm-12">
                            <br></br>
                            <br></br>
                            <br></br>
                            <a className="start-game-btn"> X STOP GAME</a>
                        </div>
                    </div>
                }



                {
                    this.state.gameOver === true &&
                    <div className="row gameover">
                        <div className="col-sm-12 text-center">
                            <h4>SCORE</h4>
                            <h3>{this.state.score}</h3>
                            <h5>New High Score</h5>
                        </div>
                        

                        <div className="col-sm-12 text-center">
                            <a onClick={this.playAgain} className="start-game-btn"> PLAY AGAIN</a>
                        </div>
                    </div>
                }

             
            </div>
          </>
        );
      }
}

export default GameplayComponent;