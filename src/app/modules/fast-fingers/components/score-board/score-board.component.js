import React from 'react';
import "./score-board.component.scss";

class ScoreBoardComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
            // level: localStorage.getItem("level") ? localStorage.getItem("level") : "",
            // errors: {
            //   name: '',
            //   level: '',
            // }
            board: localStorage.getItem("score-board") ? JSON.parse(localStorage.getItem("score-board")) : [],
            personalBestIndex: 0

        };

        
    }

    componentDidMount() {

        const objDiv = document.getElementById("score-container");
        objDiv.scrollTop = objDiv.scrollHeight;

    }

    refreshBoard() {
        const board = localStorage.getItem("score-board") ? JSON.parse(localStorage.getItem("score-board")) : [];
        console.log(board);
        
        const myMax = Math.max(...board);
        const personalBestIndex = board.indexOf(myMax);
        this.setState({ board, personalBestIndex });

        const objDiv = document.getElementById("score-container");
        objDiv.scrollTop = objDiv.scrollHeight;

    }

    render() {

        let myList = this.state.board.map((item, index) => {
            return (
                <li key={index.toString()}>Game {index + 1}: {item} <br/><span className={ `personal-best ${this.state.personalBestIndex === index ? '' : 'hidden'}` }><em>Personal Best</em></span></li>
            )
        })

        return (
            <>
                <div className="score-board-container">
                    <p className="text-center score-board-header">SCORE BOARD</p>

                    <ul id="score-container" className="board-list">
                        { myList }
                    </ul>
                </div>
            </>
        )
    }
}

export default ScoreBoardComponent;