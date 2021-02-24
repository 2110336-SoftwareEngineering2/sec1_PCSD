import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "./UpdateUserInfo.css";
import UpdateRegister_info from "./UpdateRegister_info";
import UpdateRegister_header from "./UpdateRegister_header";
import UpdateJobInfo from "./UpdateJobInfo";
import UpdateMyPet from "./UpdateMyPet";
import UpdateSumPet from "./UpdateSumPet";
import { RegisterContext } from "../context/MyContext";

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
class UpdateUserInfo extends React.Component {
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
        <UpdateRegister_header title={this.props.infotype} />
        <UpdateNextButton func={this.changeClassName} type={this.props.infotype} onChange={this.props.onChange} />
        {/*regis_header*/}
        {/*regis_info*/}
      </div>
    );
  }
}

export default UpdateUserInfo;

function UpdateNextButton(props) {
  const context = useContext(RegisterContext);
  const [state, setState] = useState({
    isNext: false,
  });
  const [values, setValue] = useState({
    ...context.data,
    username: "",
    confirmPass: "",
  });

  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    props.onChange(e);
  };

  const clickedNext = (event) => {
    event.preventDefault();

    if (!state.isNext) {
      const newUser = {
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        mobileNumber: values.mobileNumber,
        gender: values.gender,
        role: values.role,
        banStatus: values.banStatus,
      };

      const response = { user: null };

      axios
        .post("http://localhost:4000/user/register", newUser)
        .then((res) => {
          res.data.password = newUser.password;
          axios
            .post("http://localhost:4000/auth/login", res.data)
            .then((response) => {
              // context.login(res.data);
              console.log(response.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
    setState({ isNext: true });
    if (props.type == "Caretaker") {
      props.func();
    }
  };

  return (
    <div>
      {!state.isNext ? (
        <UpdateRegister_info onChange={onChange} values={values}/>
      ) : (
        <UpdateInfo info={props.type} />
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
