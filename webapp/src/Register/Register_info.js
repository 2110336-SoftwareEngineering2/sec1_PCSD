import React, { useContext, useState } from "react";
import { UserContext } from "../context/MyContext";
import "./Register_info.css";
import { RegisterContext } from "../context/MyContext";

function Register_info(props) {
  
  return (
    <div className="registerinfo">
      <form>
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
            <label>Password</label>
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
            <label>Comfirm Password</label>
            <br />
            <input
              className="texting"
              type="password"
              name="confirmPass"
              value={props.values.confirmPass}
              onChange={props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6 registercol">
            <label style={props.errors.emailError ? { color: "#a13737" } : {}}>
              Email Address
            </label>
            <br />
            <input
              className="texting"
              type="email"
              name="email"
              style={
                props.errors.emailError
                  ? { backgroundColor: "#ffd7d4", borderColor: "red" }
                  : {}
              }
              value={props.values.email}
              onChange={props.onChange}
            />
          </div>
          <div className="col-6 registercol">
            <label style={props.errors.usernameError ? { color: "#a13737" } : {}}>
              Username
            </label>
            <br />
            <input
              className="texting"
              type="text"
              name="username"
              style={
                props.errors.usernameError
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
      </form>
    </div>
  );
}

export default Register_info;

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
    <div>
      <label className="radio">
        Female&nbsp;
        <input
          name="gender"
          type="radio"
          value="female"
          checked={state.selectedOption === "female"}
          onChange={onValueChange}
        />
      </label>
      &nbsp;
      <label className="radio">
        Male&nbsp;
        <input
          name="gender"
          type="radio"
          value="male"
          checked={state.selectedOption === "male"}
          onChange={onValueChange}
        />
      </label>
    </div>
  );
}
