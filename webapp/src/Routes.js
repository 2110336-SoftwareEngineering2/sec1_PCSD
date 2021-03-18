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
import ReservePage from "./ReserveCaretaker";
import Test from "./Test";
import SearchResult from "./SearchPage/SearchResult";
import { RegisterContext, UserContext } from "./context/MyContext";
import AuthRoute from "./util/AuthRoute";
import RegRoute from "./util/RegRoute";

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
        <RegRoute
          path="/register"
          component={context.data.role == "petowner" ? Petowner : Caretaker}
        />
        <AuthRoute path="/searchpage" component={SearchPage} />
        <AuthRoute path="/searchresult" component={SearchResult} />
        <AuthRoute path="/reservepage" component={ReservePage} />
        <AuthRoute path="/chat" component={ChatPage} />
        <AuthRoute path="/banpage" component={BanPage} />
        <AuthRoute
          path="/updateinfo"
          component={
            userContext.user && userContext.user.role == "petowner"
              ? UpdatePetowner
              : UpdateCaretaker
          }
        />
        <Route path="/test" exact component={Test} />
      </Switch>
    </Router>
  );
}

export default Routes;
