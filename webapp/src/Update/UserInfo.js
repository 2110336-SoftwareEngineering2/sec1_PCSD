import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./Update_userInfo.css";
import Register_info from "./Register_info";
import Register_header from "./Register_header";
import JobInfo from "./JobInfo";
import MyPet from "./MyPet";
import { UserContext } from "../context/MyContext";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classname: "userInfo" };
    this.changeClassName = this.changeClassName.bind(this);
  }

  changeClassName() {
    this.setState({ classname: "expand" });
    this.props.func();
  }

  render() {
    return (
      <div className={this.state.classname}>
        <Register_header title={this.props.infotype} />
        <NextButton func={this.changeClassName} type={this.props.infotype} onChange={this.props.onChange} />
      </div>
    );
  }
}

export default UserInfo;

function NextButton(props) {
  const context = useContext(UserContext);
  const [state, setState] = useState({
    isNext: false,
  });
  const user = (({
    username,
    firstname,
    lastname,
    email,
    mobileNumber,
    gender,
  }) => ({ username, firstname, lastname, email, mobileNumber, gender }))(
    context.user
  );
  const [values, setValue] = useState({
    ...user,
    id: context.user._id,
    password: "",
    confirmPass: "",
  });

  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    props.onChange(e);
  };

  const clickedNext = (event) => {
    event.preventDefault();

    setState({ isNext: true });
    if (props.type == "Caretaker") {
      props.func();
    }
  };

  return (
    <div>
      {!state.isNext ? (
        <Register_info onChange={onChange} values={values} context={user} />
      ) : (
        <Info info={props.type} />
      )}
      {!state.isNext ? (
        <div className="nextbutton">
          <button className="submit" onClick={clickedNext}>
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Info(props) {
  return <div>{props.info == "Caretaker" ? <JobInfo /> : <MyPet />}</div>;
}
