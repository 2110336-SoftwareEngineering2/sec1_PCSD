import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./UserInfo.css";
import Register_info from "./Register_info";
import Register_header from "./Register_header";
import JobInfo from "./JobInfo";
import MyPet from "./MyPet";
import SumPet from "./SumPet";
function UserInfo(props) {
  return (
    <div className="userInfo">
      <Register_header title={props.infotype} />
      <NextButton type={props.infotype} />
      {/*regis_header*/}
      {/*regis_info*/}
    </div>
  );
}

export default UserInfo;

class NextButton extends React.Component {
  constructor(props) {
    super();
    this.state = { isNext: false };
    this.clickedNext = this.clickedNext.bind(this);
  }

  clickedNext(event) {
    this.setState({ isNext: true });
  }

  render() {
    return (
      <div>
        {!this.state.isNext ? (
          <Register_info />
        ) : (
          <Info info={this.props.type} />
        )}
        {!this.state.isNext ? (
          <div className="nextbutton">
            <button className="submit" onClick={this.clickedNext}>
              Save Change
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

class Info extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>{this.props.info == "Caretaker" ? <JobInfo /> : <MyPet />}</div>
    );
  }
}
