import React, { useContext, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

import BanPage from "./banpage";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import history from "./history";
import ChatPage from "./Chat/chat";
import UpdateCaretaker from "./Update/Caretaker";
import UpdatePetowner from "./Update/Petowner";
import SearchPage from "./SearchPage/SearchPage";
import Test from "./Test";
import { RegisterContext, UserContext } from "./context/MyContext";

function Routes() {
  const context = useContext(RegisterContext);
  const userContext = useContext(UserContext);

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          component={!userContext.user ? LoginPage : Home}
        />
        <Route
          path="/register"
          component={context.data.role == "petowner" ? Petowner : Caretaker}
        />
        <Route path="/searchpage" component={SearchPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/banpage" component={BanPage} />
        <Route
          path="/updateinfo"
          component={
            userContext.user && userContext.user.role == "petowner"
              ? UpdatePetowner
              : UpdateCaretaker
          }
        />
        <Route
          path="/test"
          exact
          component={Test}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
