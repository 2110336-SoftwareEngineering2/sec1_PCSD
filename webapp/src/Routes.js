import React, { useContext, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

import BanPage from "./banpage";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import history from "./history";
import ChatPage from "./Chat/chat";
import UpdateInfoCaretaker from "./UpdateInfo/UpdateInfoCaretaker";
import UpdateInfoPetowner from "./UpdateInfo/UpdateInfoPetowner";

import { RegisterContext } from "./context/MyContext";

function Routes() {
  const context = useContext(RegisterContext);
  const [values, setValue] = useState({
    user: null,
    roleDefault: "petowner",
    role: "",
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={!values.user ? LoginPage : Home} />
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
              ? UpdateInfoPetowner
              : UpdateInfoCaretaker
          }
        />
      </Switch>
    </Router>
  );
}

export default Routes;
