import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./JobInfo.css"

function JobInfo() {
  return (
      <div className="jobinfobox">
          <div className="jonibfo"> 
              <form>
                    <div className="row">
                        <div className="col-4">
                            <label>Service Type</label><br/>
                            <label>
                                <input type="checkbox" value="housesitting"/>&nbsp;House Sitting
                            </label><br/>
                            <label>
                                <input type="checkbox" value="boarding"/>&nbsp;Boarding
                            </label><br/>
                            <label>
                                <input type="checkbox" value="daycare"/>&nbsp;Day Care
                            </label><br/><br/>
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
                                        <input type="checkbox" value="dog"/>&nbsp;Dog
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="cat"/>&nbsp;Cat
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="rabbit"/>&nbsp;Rabbit
                                    </label>
                                </div>
                                <div className="col-6">
                                    <label>
                                        <input type="checkbox" value="bird"/>&nbsp;Bird
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="hamster"/>&nbsp;Hamster
                                    </label><br/>
                                    <label>
                                        <input type="checkbox" value="turtle"/>&nbsp;Turtle
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
                        <div className="col-12 signupbutton">
                            <button className="signup" type="submit">Sign Up</button>
                        </div>
                    </div>
                </form>
            </div> 
        </div>
  );
}

export default JobInfo;


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