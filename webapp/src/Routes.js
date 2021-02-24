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
import { RegisterContext, UserContext } from "./context/MyContext";

function Routes() {
  const context = useContext(RegisterContext);
  const userContext = useContext(UserContext);
  console.log(context, userContext);
  const [values, setValue] = useState({
    user: null,
    roleDefault: "petowner",
    role: "",
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={!userContext.user ? LoginPage : Home} />
        <Route
          path="/register"
          component={context.data.role == "petowner" ? Petowner : Caretaker}
        />
        <Route path="/chat" component={ChatPage} />
        <Route path="/banpage" component={BanPage} />
        <Route
          path="/updateinfo"
          component={
            context.data.role == "petowner"
              ? UpdatePetowner
              : UpdateCaretaker
          }
        />
      </Switch>
    </Router>
  );
}

export default Routes;