import React, { Component } from "react";
import axios from "axios";
import Register from "./Register-component";
import "./style.css";
import $ from 'jquery';
import "./script";

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
      /*<div className="container my-4">
        <div className="row">
          <div className="col12 col-md-8 offset-md-2">
            <form onSubmit={(e) => this.onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => this.setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => this.setPass(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Remember Me
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div> */
    <div className="login__register">
        <ul class="tabs">
		<li class="active">Login</li>
		<li>Register</li>
	   </ul>
        <ul className="tab__content">
		<li className="active">
			<div className="content__wrapper">
				<form onSubmit={(e) => this.onSubmit(e)}>
					<input type="email" 
                        name="email" 
                        placeholder="Email address" 
                        onChange={(e) => this.setEmail(e.target.value) }/>
					<input type="password" 
                              name="password" 
                              placeholder="Password" 
                            onChange={(e) => this.setPass(e.target.value)} />
					<input type="submit" value="Login" name="login" />
				</form>
                <div className="form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" />  Remember me  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="#"> Forgotten password? </a>
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
