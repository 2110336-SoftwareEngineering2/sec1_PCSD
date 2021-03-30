import React, { useContext, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./Register_info.css";
import Caretaker from "./Caretaker.js";
import { UserContext } from "../context/MyContext";

function Register_info(props) {
  return (
    <div className="register_info">
      <RegisterInfo onChange={props.onChange} values={props.values} context={props.context} />
    </div>
  );
}

export default Register_info;

function RegisterInfo(props) {
  const { login } = useContext(UserContext);
  const [errors, setError] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();

    // In case password and confirm password not matched
    if(props.values.confirmPass !== props.values.password) {
      setError({confirmError: true});
      return;
    }
    
    editUser();
  }
  
  const editUser = () => {
    const editedUser = {};

    for(const key in props.values) {
      if(key == "confirmPass") continue;
      if(props.values[key].length > 0) {
        if(props.context[key] !== props.values[key]) {
          editedUser[key] = props.values[key];
        }
      }
    }
  
    axios
      .post("http://localhost:4000/user/edit", editedUser)
      .then((res) => {
        login(res.data);
        window.alert("Edit user successful");
        setError({});
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="registerinfo">
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-6 registercol">
            <label>First name</label>
            <br />
            <input
              className="texting"
              type="text"
              name="firstname"
              value={props.values.firstname}
              onChange={props.onChange}
            />
          </div>
          <div className="col-6 registercol">
            <label>Surname</label>
            <br />
            <input
              className="texting"
              type="text"
              name="lastname"
              value={props.values.lastname}
              onChange={props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 registercol">
            <label>New Password</label>
            <br />
            <input
              className="texting"
              type="password"
              name="password"
              value={props.values.password}
              onChange={props.onChange}
            />
          </div>
          <div className="col-6 registercol">
            <label style={errors.confirmError ? { color: "#a13737" } : {}}>Comfirm New Password</label>
            <br />
            <input
              className="texting"
              type="password"
              name="confirmPass"
              style={
                errors.confirmError
                  ? { backgroundColor: "#ffd7d4", borderColor: "red" }
                  : {}
              }
              value={props.values.confirmPass}
              onChange={props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 registercol">
            <label>Email Address</label>
            <br />
            <input
              className="texting"
              type="email"
              name="email"
              value={props.values.email}
              onChange={props.onChange}
              disabled
            />
          </div>
          <div className="col-6 registercol">
            <label style={errors.usernameError ? { color: "#a13737" } : {}}>Username</label>
            <br />
            <input
              className="texting"
              type="text"
              name="username"
              style={
                errors.usernameError
                  ? { backgroundColor: "#ffd7d4", borderColor: "red" }
                  : {}
              }
              value={props.values.username}
              onChange={props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 registercol">
            <label>Phone Number</label>
            <br />
            <input
              className="texting"
              type="tel"
              pattern="[0-9]{10}"
              name="mobileNumber"
              value={props.values.mobileNumber}
              onChange={props.onChange}
            />
          </div>
          <div className="col-6 registercol">
            <label>Gender</label>
            <br />
            <RadioButton
              gender={props.values.gender}
              onChange={props.onChange}
            />
          </div>
        </div>
        <button className="savechange" type="submit">Save Change</button>
      </form>
    </div>
  );
}

function RadioButton(props) {
  const selected = props.gender;
  const [state, setState] = useState({
    selectedOption: selected,
  });

  const onValueChange = (event) => {
    setState({ selectedOption: event.target.value });
    props.onChange(event);
  };

  return (
    <div className="container" id="radioo">
  <form>
    <label className="radio" >
      <input name="gender"
          type="radio"
          value="female"
          checked={state.selectedOption === "female"}
          onChange={onValueChange}/>
      <span>Female</span>
    </label>
    <label className="radio">
      <input name="gender"
          type="radio"
          value="male"
          checked={state.selectedOption === "male"}
          onChange={onValueChange}/>
      <span>Male</span>
    </label>
  </form>
</div>
  );
}
