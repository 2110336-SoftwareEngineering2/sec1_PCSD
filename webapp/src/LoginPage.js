import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Logo from "./Logo";
import UserLogin from "./component/login-component";

function LoginPage() {
  return (
    <div className="loginPage">
      <Logo />
      <div className="app__body">
        <UserLogin />
      </div>
    </div>
  );
}

export default LoginPage;
