import React from 'react';
import "./timer.component.scss";

class TimerComponent extends React.Component {
  
    constructor(props) {
      super(props);

      // Start with an initial value of 20 seconds
      this.TIME_LIMIT = 5;

      // Initially, no time has passed, but this will count up
      // and subtract from the TIME_LIMIT
      this.timePassed = 0;
      this.timeLeft = this.TIME_LIMIT;

      // Warning occurs at 10s
      this.WARNING_THRESHOLD = 10;
      // Alert occurs at 5s
      this.ALERT_THRESHOLD = 5;

      this.COLOR_CODES = {
        info: {
          color: "green"
        },
        warning: {
          color: "orange",
          threshold: this.WARNING_THRESHOLD
        },
        alert: {
          color: "red",
          threshold: this.ALERT_THRESHOLD
        }
      };
      
      this.remainingPathColor = this.COLOR_CODES.info.color;

      // this.startTimer(5);
    }

    componentDidMount() {
      this.props.onRef(this);
    }
    componentWillUnmount() {
      this.props.onRef(undefined);
    }

    method() {
      this.startTimer(5);
      window.alert('do stuff')
    }

    formatTimeLeft(time) {
      // The largest round integer less than or equal to the result of time divided being by 60.
      const minutes = Math.floor(time / 60);
      
      // Seconds are the remainder of the time divided by 60 (modulus operator)
      let seconds = time % 60;
      
      // If the value of seconds is less than 10, then display seconds with a leading zero
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
    
      // The output in MM:SS format
      return `${minutes}:${seconds}`;
    }

    startTimer(time) {
      this.TIME_LIMIT = time;
      this.timePassed = 0;
      this.timeLeft = this.TIME_LIMIT;

      try {
        clearInterval(this.timerInterval);
      } catch (error) {
        
      }

      this.timerInterval = setInterval(() => {
        
        // The amount of time passed increments by one
        this.timePassed = this.timePassed += 1;
        this.timeLeft = this.TIME_LIMIT - this.timePassed;
        
        // The time left label is updated
        document.getElementById("base-timer-label").innerHTML = this.formatTimeLeft(this.timeLeft);

        this.setCircleDasharray();

        // this.setRemainingPathColor(this.timeLeft);

        if (this.timeLeft <= 0) {
          this.stopTimer();
        }

      }, 1000);
    }

    stopTimer() {
      this.props.timeup();
      clearInterval(this.timerInterval);
    }


    calculateTimeFraction() {
      const rawTimeFraction = this.timeLeft / this.TIME_LIMIT;
      return rawTimeFraction - (1 / this.TIME_LIMIT) * (1 - rawTimeFraction);
    }
        
    // Update the dasharray value as time passes, starting with 283
    setCircleDasharray() {
      const circleDasharray = `${(
        this.calculateTimeFraction() * 283
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }

    setRemainingPathColor(timeLeft) {
      const { alert, warning, info } = this.COLOR_CODES;
    
      // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
      if (timeLeft <= alert.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(warning.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(alert.color);
    
      // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
      } else if (timeLeft <= warning.threshold) {
        document
          .getElementById("base-timer-path-remaining")
          .classList.remove(info.color);
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(warning.color);
      } else {
      
        document
          .getElementById("base-timer-path-remaining")
          .classList.add(info.color);
      }
    }

    render() {

        // this.startTimer();

        return (
          <>
            <div className="base-timer">
              <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <g className="base-timer__circle">
                  <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
                  <path
                      id="base-timer-path-remaining"
                      strokeDasharray="283"
                      className="base-timer__path-remaining theme-color"
                      d="
                        M 50, 50
                        m -45, 0
                        a 45,45 0 1,0 90,0
                        a 45,45 0 1,0 -90,0
                      ">
                  </path>
                </g>
              </svg>
              <span id="base-timer-label" className="base-timer__label">
                -:-
              </span>
            </div>            
          </>
        );
      }
      
      
}

export default TimerComponent;