import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Logo from "./Logo";
import UserLogin from "./component/login-component";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import history from "./history";

function Routes(){
    const user = null;
    const role = "petowner";
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={!user ? LoginPage : Home} />
          <Route
            path="/register" 
            component={role == "petowner" ? Petowner : Caretaker}
          />
        </Switch>
      </Router>
    );

}

export default Routes;