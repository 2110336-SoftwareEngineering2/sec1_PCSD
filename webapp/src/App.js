import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Logo from "./Logo";
import UserLogin from "./component/login-component";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Routes from "./Routes";

import { ContextProvider, RegisterProvider } from "./context/MyContext";

function App() {
  return (
    <ContextProvider>
      <RegisterProvider>
        <div className="app">
          <Routes />
        </div>
      </RegisterProvider>
    </ContextProvider>
  );
}

export default App;
