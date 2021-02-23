import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./UserInfo.css";
import Register_info from "./Register_info";
import Register_header from "./Register_header";
import JobInfo from "./JobInfo";
import MyPet from "./MyPet";
import SumPet from "./SumPet";
//function UserInfo(props) {
//  return (
//    <div className="userInfo">
//      <Register_header title={props.infotype}/>
//        <NextButton type={props.infotype}/>
//      {/*regis_header*/}
//      {/*regis_info*/}
//    </div>
//
//  );
//}

class UserInfo extends React.Component {
    constructor(props) {
        super();
        this.state = {classname: "userInfo"};
        this.changeClassName = this.changeClassName.bind(this);
    }
    
    changeClassName() {
        this.setState({classname: "expand"});
        this.props.func();
    }
    
    render() {
        return(
            <div className={this.state.classname}>
              <Register_header title={this.props.infotype}/>
                <NextButton func={this.changeClassName} type={this.props.infotype}/>
              {/*regis_header*/}
              {/*regis_info*/}
            </div>
        );
    }
}

export default UserInfo;

class NextButton extends React.Component {
    constructor(props) {
        super();
        this.state = {isNext: false};
        this.clickedNext = this.clickedNext.bind(this);
    }
    
    clickedNext(event) {
        this.setState({isNext: true});
        this.props.func();
    }
    
    render() {
        return(
            <div>
                {!this.state.isNext ? <Register_info/> : <Info info={this.props.type}/>}
                {!this.state.isNext ? 
                 <div className="nextbutton">
                    <button className="submit" onClick={this.clickedNext}>Next</button>
                 </div> : null}
            </div>
        );
    }
}

class Info extends React.Component {
    constructor(props) {
        super();
    }
    
    render() {
        return(
            <div>
                {this.props.info == "Caretaker" ? <JobInfo/> : <MyPet/>}
            </div>
        );
    }
}