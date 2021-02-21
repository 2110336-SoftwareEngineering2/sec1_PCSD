import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import petidcare from "./petidcare.png";
import Logo from "./Logo";
import UserLogin from "./component/login-component";
import "./component/script";

function LoginPage() {
  return (
    <div className="loginPage">
      <div className="app__body">
        <Logo />
        <UserLogin />
      </div>
    </div>
  );
}

export default LoginPage;
