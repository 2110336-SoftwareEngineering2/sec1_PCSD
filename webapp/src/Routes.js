import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import BanPage from "./banpage";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import history from "./history";
import ChatPage from "./Chat/chat";
import Header from "./Header/header";
function Routes() {
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
        <Route path="/chat" component={ChatPage} />
        <Route path="/banpage" component={BanPage} />
      </Switch>
    </Router>
  );
}

export default Routes;
