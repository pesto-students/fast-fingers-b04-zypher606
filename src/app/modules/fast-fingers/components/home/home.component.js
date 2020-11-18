import React from 'react';
import "./home.component.scss";
import BackgroundComponent from '../background/background.component';
import logo from '../../../../../assets/img/Icon awesome-keyboard.png';
import startArrow from '../../../../../assets/img/Icon awesome-play.png';


class HomeComponent extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: localStorage.getItem("name") ? localStorage.getItem("name") : "",
            level: localStorage.getItem("level") ? localStorage.getItem("level") : "",
            errors: {
              name: '',
              level: '',
            }
        };
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
    
        switch (name) {
          case 'name': 
            errors.name = 
              value.length === 0
                ? 'Name is mandatory'
                : '';
            break;
          case 'level': 
            errors.level = 
              value === ''
                ? 'Level is mandatory'
                : '';
            break;
          default:
            break;
        }
    
        this.setState({errors, [name]: value});
    }

    // handleClick() {
    //     this.props.history.push(`/gameplay`);
    //     // this.history.push("/fast-fingers/gameplay");
    // }

    handleSubmit = (event) => {

        console.log("In here")
        event.preventDefault();

        if (!this.state.name || !this.state.level) {
            const e1 = this.state.name ? "" : "Name is mandatory!";
            const e2 = this.state.level ? "" : "Level is mandatory!";

            this.setState({errors: { name: e1, level: e2 }});
            return;
        }

        localStorage.setItem("name", this.state.name);
        localStorage.setItem("level", this.state.level);

        this.props.history.push(`/gameplay`);
      
    }

    render() {
        const { errors } = this.state;
        const { name, level } = this.state;
        return (
          <>
            <BackgroundComponent></BackgroundComponent>
            <div className="container home-container">
                <div className="row">
                    <div className="col-sm-12 intro-header">
                        <img src={logo} alt="logo"/>
                        <h3>fast fingers</h3>
                        <h4>the ultimate typing game</h4>
                    </div>
                </div>
                <br></br>
                <form onSubmit={this.handleSubmit} noValidate className="user-details-form" >
                    <div className="row">
                        <div className="col-sm-4 offset-sm-4 form-group">
                            <input value={name} className="textbox-username" onChange={this.handleChange} noValidate type="text" name="name" placeholder="TYPE YOUR NAME"/>
                            <p className="form-error">{errors.name}</p>
                        </div>
                        
                    </div>

                    <div className="row">
                        <div className="col-sm-4 offset-sm-4 form-group">
                            <select defaultValue={level} className="select-difficulty" onChange={this.handleChange} noValidate name="level" id="cars">
                                <option value="" disabled>DIFFICULTY LEVEL</option>
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>     
                            <p className="form-error">{errors.level}</p>
                        </div>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>

                    <div className="row text-center">
                        <button className="start-game-btn submit"> <img src={startArrow} alt="start icon" />START GAME</button>
                    </div>

                </form>
            </div>
          </>
        );
      }
}

export default HomeComponent;