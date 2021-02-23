import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Logo from "./Logo";
import UserLogin from "./component/login-component";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Routes from "./Routes";
function App() {
  return (
    <div className="app">
      <Routes />
    </div>
  );
}

export default App;
