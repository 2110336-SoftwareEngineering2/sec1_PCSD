import React, { Component } from "react";
import axios from "axios";
import Register from "./Register-component";
import "./style.css";
import $ from "jquery";
import "./script";
import Logo from "./../Logo";
export default class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  setEmail(email) {
    this.setState({
      email: email,
    });
  }

  setPass(password) {
    this.setState({
      password: password,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:4000/auth/login", user)
      .then((res) => console.log(res.data));
  }

  render() {
    return (
      <div className="login__register">
        <ul className="tabs">
          <li className="active">Login</li>
          <li>Register</li>
        </ul>
        <ul className="tab__content">
          <li className="active">
            <div className="content__wrapper">
              <form onSubmit={(e) => this.onSubmit(e)}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  onChange={(e) => this.setEmail(e.target.value)}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => this.setPass(e.target.value)}
                />
                <input type="submit" value="Login" name="login" />
              </form>
              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />{" "}
                  Remember me
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <a href="#"> Forgotten password? </a>
                </label>
              </div>
            </div>
          </li>
          <Register />
        </ul>
      </div>
    );
  }
}
