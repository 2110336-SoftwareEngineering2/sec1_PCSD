import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Register_info.css";
import Caretaker from './Caretaker.js'
function Register_info(props) {
    const [fname, setFName] = useState("firstName");
    const [sname, setSName] = useState("surName");
    const [username, setUserName] = useState("username");
    function onfName(event){
        //setFName(event.target.value);
        props.updateFunc.onfName(event.target.value);
    }
    function onsName(event){
        //setSName(event.target.value);
        props.updateFunc.onsName(event.target.value);
    }
    function onUsername(event){
        //setUserName(event.target.value);
        props.updateFunc.onUsername(event.target.value);
    }
    //console.log(fname);
  return (
    <div className="register_info">
        <div className="registerinfo">
                <form>
                <div className="row">
                    <div className="col-6">
                        <label>First name</label><br/>
                        <input className="texting" type="text" onChange={onfName}/>
                    </div>
                    <div className="col-6">
                        <label>Surname</label><br/>
                        <input className="texting" type="text" onChange={onsName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Password</label><br/>
                        <input className="texting" type="password"/>
                    </div>
                    <div className="col-6">
                        <label>Comfirm Password</label><br/>
                        <input className="texting" type="password"/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Email Address</label><br/>
                        <input className="texting" type="email"/>
                    </div>
                    <div className="col-6">
                        <label>Username</label><br/>
                        <input className="texting" type="text"onChange={onUsername}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Phone Number</label><br/>
                        <input className="texting" type="tel" pattern="[0-9]{10}"/>
                    </div>
                    <div className="col-6">
                        <label>Gender</label><br/>
                        <RadioButton/>
                    </div>
                </div>
                </form>
            </div>
    </div>
  );
}

export default Register_info;


class RadioButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: null};
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.setState({selectedOption: event.target.value});
    }
    
    render() {
        return(
            <div>
                <label className="radio">
                    Female&nbsp;<input 
                              type="radio" 
                              value="female" 
                              checked={this.state.selectedOption === "female"} 
                              onChange={this.onValueChange}/>
                </label>
                &nbsp;
                <label className="radio">
                    Male&nbsp;<input 
                            type="radio" 
                            value="male" 
                            checked={this.state.selectedOption === "male"} 
                            onChange={this.onValueChange}/>
                </label>
            </div>
        );
    }
}