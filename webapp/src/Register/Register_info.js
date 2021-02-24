import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./Register_info.css";
import Caretaker from "./Caretaker.js";
import { RegisterContext } from "../context/MyContext";

function Register_info(props) {
  return (
    <div className="register_info">
      <RegisterInfo onChange={props.onChange} values={props.values} />
    </div>
  );
}

export default Register_info;

function RegisterInfo(props) {
  return (
    <div className="registerinfo">
      <form>
        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
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
          <div className="col-6">
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
          <div className="col-6">
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
          <div className="col-6">
            <label>Email Address</label>
            <br />
            <input
              className="texting"
              type="email"
              name="email"
              value={props.values.email}
              onChange={props.onChange}
            />
          </div>
          <div className="col-6">
            <label>Username</label>
            <br />
            <input
              className="texting"
              type="text"
              name="username"
              value={props.values.username}
              onChange={props.onChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
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
          <div className="col-6">
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

function RadioButton(props) {
  const selected = props.gender;
  const [state, setState] = useState({
    selectedOption: selected,
  });

  const onValueChange = (event) => {
    setState({ selectedOption: event.target.value });
    props.onChange({ gender: state.selectedOption });
  };

  return (
    <div>
      <label className="radio">
        Female&nbsp;
        <input
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
          type="radio"
          value="male"
          checked={state.selectedOption === "male"}
          onChange={onValueChange}
        />
      </label>
    </div>
  );
}
// class RadioButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { selectedOption: null };
//     this.onValueChange = this.onValueChange.bind(this);
//   }

//   onValueChange(event) {
//     this.setState({ selectedOption: event.target.value });
//   }

//   render() {
//     return (
//       <div>
//         <label className="radio">
//           Female&nbsp;
//           <input
//             type="radio"
//             value="female"
//             checked={this.state.selectedOption === "female"}
//             onChange={this.onValueChange}
//           />
//         </label>
//         &nbsp;
//         <label className="radio">
//           Male&nbsp;
//           <input
//             type="radio"
//             value="male"
//             checked={this.state.selectedOption === "male"}
//             onChange={this.onValueChange}
//           />
//         </label>
//       </div>
//     );
//   }
// }
