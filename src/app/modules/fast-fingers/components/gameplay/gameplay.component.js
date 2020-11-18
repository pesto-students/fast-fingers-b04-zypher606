import React from 'react';
import "./gameplay.component.scss";
import BackgroundComponent from '../background/background.component';
import ScoreBoardComponent from '../score-board/score-board.component';
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
            difficultyLevel: localStorage.getItem("level"), // 1 => easy, 2 => medium, 3 => Hard
            difficultyFactor: 1,  // 1 => easy, 1.5 => Med, 2 => Hard
            difficultyFactorDelta: 0.1,
            gameOver: false,
            score: 0,
            name: localStorage.getItem("name")
        }

        // this.setupDifficultyFactor();

        this.dictionary = dictionary;

        this.timeup = this.timeup.bind(this);
        this.validateResult = this.validateResult.bind(this);
        this.restartGameplay = this.restartGameplay.bind(this);
        this.startGameplay = this.startGameplay.bind(this);

        // this.child = React.createRef();

        // this.child = this.child.bind(this);
        this.timerRef = React.createRef();
        this.scoreBoardRef = React.createRef();
    }

    componentDidMount() {
        this.setupDifficultyFactor();
        this.startGameplay();
    }

    componentWillUnmount() {
        this.stopGame();
    }

    setupDifficultyFactor() {
        let factor = 1;
        switch (this.state.difficultyLevel) {
            case 'EASY':
                factor = 1
                break;
            case 'MEDIUM':
                factor = 1.5;
                break;
            case 'HARD':
                factor = 2;
                break;
            default:
                factor = 1;
                break;
        }

        this.setState({difficultyFactor: factor});
    }

    startGameplay() {
        const targetStr = this.getRandomWord();
        this.setState({target: targetStr});

        const timerCount = this.getTimeLimit();
        this.timerRef.current.startTimer(timerCount);
        this.resetColorCode();

        clearInterval(this.scoreCounter);
        this.scoreCounter = setInterval(() => {
            this.setState({score: this.state.score + 1});
        }, 1000);
    }

    getTimeLimit() {
        debugger
        const len = this.state.target.length;
        const factor = this.state.difficultyFactor;
        const calc = Math.ceil(len / factor);
        return Math.max(calc, 2);
    }

    continueGameplay() {
        const targetStr = this.getRandomWord();
        this.setState({target: targetStr, difficultyFactor: this.state.difficultyFactor + this.state.difficultyFactorDelta});
        
        const timerCount = this.getTimeLimit();
        this.timerRef.current.startTimer(timerCount);

        // this.resetColorCode();


        clearInterval(this.scoreCounter);
        this.scoreCounter = setInterval(() => {
            this.setState({score: this.state.score + 1});
        }, 1000);
    }


    getRandomWord() {
        debugger
        const level = this.state.difficultyFactor;
        let dictionary;
        if (level >= 1 && level < 1.5) {
            dictionary = this.dictionary.filter(d => d.length <= 4);
        } else if (level >= 1.5 && level < 2) {
            dictionary = this.dictionary.filter(d => d.length >=  5 && d.length <= 8);
        } else if (level >= 2) {
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
        // Game over code in here
        this.setState({result: '', gameOver: true});
        clearTimeout(this.scoreCounter);

        const scoreBoard = localStorage.getItem("score-board") ? JSON.parse(localStorage.getItem("score-board")) : [];
        scoreBoard.push(this.state.score);
        console.log("==========>", scoreBoard)
        localStorage.setItem("score-board", JSON.stringify(scoreBoard));

        this.scoreBoardRef.current.refreshBoard();
    }

    validateResult(result) {
        // console.log(this.state.target, result)
        if (this.state.target === result) {
            this.setState({result: ''});
            this.continueGameplay();
            this.resetColorCode();
        } else {
            this.changeColorCode(result);
        }
    }

    changeColorCode = (result) => {
        const size = this.state.target.split('').length;

        // if (!result) {
        //     this.resetColorCode();
        //     return;
        // }

        let isCorrectTillNow = true
        for (let i = 0; i < Math.min(size, result.length); i += 1) {
            if (result[i] === this.state.target[i] && isCorrectTillNow === true) {
                const el = document.querySelector(`#target-text span:nth-child(${i+1})`);
                el.style.color = '#54ba18';
            } else {
                const el = document.querySelector(`#target-text span:nth-child(${i+1})`);
                el.style.color = '#445298';
                isCorrectTillNow = false;
            }
        }

        for (let j = result.length; j < size; j++) {
            const el = document.querySelector(`#target-text span:nth-child(${j+1})`);
            el.style.color = 'white'
        }

    }

    resetColorCode() {
        const size = this.state.target.split('').length;
        for (let i = 0; i < size; i += 1) {
            const el = document.querySelector(`#target-text span:nth-child(${i+1})`);
            el.style.color = 'white'
        }
    }

    onClick = () => {
        this.child.method(); // do stuff
    }

    restartGameplay() {
        this.setState({ gameOver: false, score: 0 });
        this.startGameplay();

        // window.location.reload(false);
    }

    stopGame() {
        this.setState({ gameOver: true });
        clearInterval(this.scoreCounter);
        this.timerRef.current.stopTimer();
    }

    quitGame = () => {
        this.stopGame();
        this.timeup();
        localStorage.clear();
        this.props.history.push(`/`);    
    }

    // restartGameplay = () => {
    //     this.timerRef.current.getWrappedInstance().startTimer(2);
    //     // this.child.current.startTimer(2);
    // };

    render() {
        // const restartGameplay = () => {
        //     this.startGameplay().bind(this);
        // };

        const targetText = this.state.target.split('').map((item, index) => {
            return (
                <span key={index.toString()}>{item}</span>
            )
        })
        return (
          <>
            <BackgroundComponent></BackgroundComponent>
            <div className="container gameplay-container">
                <div className="row header-container">
                    <div className="col-sm-6 text-left">
                        
                        <h4><img src={iconPerson} alt="logo 1"/> {this.state.name}</h4>
                        <h4><img src={iconGamepad} alt="logo 2"/> LEVEL : {this.state.level}</h4>
                        
                        <ScoreBoardComponent ref={ this.scoreBoardRef }/>

                    </div>
                    <div className="col-sm-6 text-right">
                        <h4>fast fingers</h4>
                        <h4>SCORE: {this.state.score}</h4>
                    </div>
                </div>
                <br></br>

                {   
                    // this.state.gameOver === false && 
                    <div className={`row inprogress ${this.state.gameOver === true ? 'hidden' : ''}`}>
                        <TimerComponent
                            ref={this.timerRef} 
                            // onRef={ref => (this.child = ref)}
                            timeup={this.timeup}>
                        </TimerComponent>

                        <div className="col-sm-12 text-center">
                            <h4 id="target-text" className="target-text">
                                { targetText }
                            </h4>
                            <input autoFocus value={this.state.result} onChange={(e) => {this.handleAnswerChange(e)}} className="textbox-user-input" type="text" name="username" placeholder="TYPE YOUR NAME"/>
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
                            <a href onClick={this.restartGameplay.bind(this)} className="start-game-btn"> PLAY AGAIN</a>
                        </div>
                    </div>
                }



                {   
                    this.state.gameOver === false && 
                    <div className="row">
                        <button onClick={this.stopGame.bind(this)} className="stop-game-btn"> <span className="Icon-metro-cross"></span>STOP GAME</button>
                    </div>
                }

                {   
                    this.state.gameOver === true && 
                    <div className="row">
                        <button onClick={this.quitGame} className="stop-game-btn"> <span className="Icon-metro-cross"></span> QUIT</button>
                    </div>
                }


             
            </div>
          </>
        );
      }
}

export default GameplayComponent;