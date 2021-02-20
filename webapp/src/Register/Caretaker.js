import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './Caretaker.css'

function Caretaker() {
  return (
//    <div className="caretaker">
//        <p>This is Caretaker register page</p>
//    </div>
      <CaretakerInfo/>
  );
}

export default Caretaker;

/* added */
class CaretakerInfo extends React.Component {
    constructor(probs) {
        super(probs);
        this.state = {isNext: false};
        this.clickedNext = this.clickedNext.bind(this);
    }
    
    clickedNext(event) {
        this.setState({isNext: true});
    }
    
    render() {
        return(
            <div className="container">
                <form>
                    {!this.state.isNext ? <UserInfo/> : <JobInfo/>}
                    <div className="row">
                        {this.state.isNext ? null : 
                            <div className="col-12 next">
                                <button className="submit" onClick={this.clickedNext}>Next</button>
                        </div>}
                    </div>
                </form>
            </div>
        );
    }
}

class UserInfo extends React.Component {
    render() {
        return(
            <div className="userinfo">
                <div className="row">
                    <div className="col-6">
                        <label>First name</label><br/>
                        <input className="texting" type="text"/>
                    </div>
                    <div className="col-6">
                        <label>Surname</label><br/>
                        <input className="texting" type="text"/>
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
                        <input className="texting" type="text"/>
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
            </div>
        );
    }
}

class JobInfo extends React.Component {
    render() {
        return(
            <div className="jobinfo">
                <form>
                    <div className="row">
                        <div className="col-4">
                            <label>Service Type</label><br/>
                            <label>
                                <input type="checkbox" value="housesitting"/>House Sitting
                            </label><br/>
                            <label>
                                <input type="checkbox" value="boarding"/>Boarding
                            </label><br/>
                            <label>
                                <input type="checkbox" value="daycare"/>Day Care
                            </label><br/>
                            <label>Rate per hour (baht)</label><br/>
                            <input className="texting" type="number"/>
                        </div>
                        <div className="col-4">
                            <label>Service Area</label><br/>
                            <label>City:</label>&nbsp; &nbsp;<input className="texting" type="text"/><br/>
                            <label>Province:</label>&nbsp; &nbsp;<input className="texting" type="text"/><br/>
                            <label>Country:</label>&nbsp; &nbsp;<input className="texting" type="text"/>
                        </div>
                        <div className="col-4">
                            <label>Description</label><br/>
                            <textarea className="texting"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <label>Pet Type</label><br/>
                            <div className="row">
                                <div className="col-6">
                                    <label>
                                        <input type="checkbox" value="dog"/>Dog
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="cat"/>Cat
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="rabbit"/>Rabbit
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label>
                                        <input type="checkbox" value="bird"/>Bird
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="hamster"/>Hamster
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="turtle"/>Turtle
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-8 availdaysbox">
                            <label>Available Day(s)</label><br/>
                            <AvailableDays/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 signup">
                            <button className="submit" type="submit">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

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
                    Female<input 
                              type="radio" 
                              value="female" 
                              checked={this.state.selectedOption === "female"} 
                              onChange={this.onValueChange}/>
                </label>
                &nbsp;
                <label className="radio">
                    Male<input 
                            type="radio" 
                            value="male" 
                            checked={this.state.selectedOption === "male"} 
                            onChange={this.onValueChange}/>
                </label>
            </div>
        );
    }
}

class AvailableDays extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mon: null, tue: null, wed: null, thu: null, fri: null, sat: null, sun: null};
        this.handleOnClicked = this.handleOnClicked.bind(this);
    }
    
    handleOnClicked(event) {
        const name = event.target.name;
        const val = this.state[name];
        if (val !== null) {
            event.target.style.backgroundColor = "white";
            event.target.style.color = "#8e8e8e";
            this.setState({[name]: null});
        } else {
            event.target.style.backgroundColor = "#9d7f70";
            event.target.style.color = "white";
            this.setState({[name]: name});
        }
    }
    
    render() {
        return(
            <div className="availdays">
                <button name="mon" type="button" onClick={this.handleOnClicked} value={this.state.mon}>Mon</button>&nbsp; &nbsp;
                <button name="tue" type="button" onClick={this.handleOnClicked} value={this.state.tue}>Tue</button>&nbsp; &nbsp;
                <button name="wed" type="button" onClick={this.handleOnClicked} value={this.state.wed}>Wed</button>&nbsp; &nbsp;
                <button name="thu" type="button" onClick={this.handleOnClicked} value={this.state.thu}>Thu</button>&nbsp; &nbsp;
                <button name="fri" type="button" onClick={this.handleOnClicked} value={this.state.fri}>Fri</button>&nbsp; &nbsp;
                <button name="sat" type="button" onClick={this.handleOnClicked} value={this.state.sat}>Sat</button>&nbsp; &nbsp;
                <button name="sun" type="button" onClick={this.handleOnClicked} value={this.state.sun}>Sun</button>
            </div>
        );
    }
}