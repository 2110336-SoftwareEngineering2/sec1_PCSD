import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./Edit_header.css";
import "./Update_userInfo.css";
import Register_info from "./Register_info";
import Register_header from "./Register_header";
import JobInfo from "./JobInfo";
import MyPet from "./MyPet";
import { RegisterContext } from "../context/MyContext";

function UserInfo(props) {
  const [state, setState] = useState({
    classname: "userInfo",
  });

  const changeClassName = () => {
    setState({ classname: "expand" });
  };

  return (
    <div className={state.classname}>
      <div className="register_header">
       <p>Edit Profile</p>
      </div>
      <NextButton
        func={changeClassName}
        type={props.infotype}
        onChange={props.onChange}
      />
    </div>
  );
}

export default UserInfo;

function NextButton(props) {
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
        <Register_info onChange={onChange} values={values}/>
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
