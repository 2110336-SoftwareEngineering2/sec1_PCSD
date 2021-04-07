import React, { useContext, useState } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";

import Register from "./Register-component";
import LoadScript from "./script";
import "./style.css";
import history from "./../history";
import { UserContext } from "../context/MyContext";

function UserLogin(props) {
  LoadScript();

  const context = useContext(UserContext);
  const [values, setValue] = useState({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState({
    errorMessage: null,
  });

  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    setShowError({
      errorMessage: null,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: values.email,
      password: values.password,
    };

    axios
      .post("http://localhost:4000/auth/login", user)
      .then((res) => {
        context.login(res.data);
        // setCookie("accessToken", (res.data).accessToken, {path: "/"});
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data)
        setShowError({errorMessage: err.response.data.error});
      });
  };

  return (
    <div className="login__register">
      <ul className="tabs">
        <li className="active">Login</li>
        <li>Register</li>
      </ul>
      <ul className="tab__content">
        <li className="active">
          <div className="content__wrapper">
            <form onSubmit={onSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                onChange={onChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
              />
              <input
                type="submit"
                value="Login"
                name="login"
                onClick={() => {
                  history.push({ pathname: "/" });
                }}
              />
            </form>
            <div className="form-check">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" /> Remember
                me &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                <a href="#"> Forgotten password? </a>
              </label>
            </div>
            {showError.errorMessage ? 
              (<div className="login-error">
                <Alert variant="danger">{showError.errorMessage}</Alert>
              </div>) : null
            }
          </div>
        </li>
        <Register />
      </ul>
    </div>
  );
}

export default UserLogin;
