import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Logo from "./Logo";
import UserLogin from "./component/login-component";

function App() {
  // const [email, setEmail] = useState('');
  // const [pass, setPass] = useState('');
  // console.log('render email', email);

  return (
       <div className="app">
      <div className="app__body">
      <Logo />
     <Router>
      <Route path="/" exact component={UserLogin} />
    </Router>
      </div>
    </div>

  );
}

export default App;

