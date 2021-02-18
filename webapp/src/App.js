import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import UserLogin from "./component/login-component";

function App() {
  // const [email, setEmail] = useState('');
  // const [pass, setPass] = useState('');
  // console.log('render email', email);

  return (
    <Router>
      <Route path="/" exact component={UserLogin} />
    </Router>
  );
}

export default App;
