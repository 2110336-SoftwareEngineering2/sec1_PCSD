import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

<<<<<<< HEAD
=======
import BanPage from "./banpage";
>>>>>>> 25fcafa2f79b66fe64c4117007e4be2d9f38167e
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import history from "./history";
import ChatPage from "./Chat/chat";
<<<<<<< HEAD
import MyContext from "./component/MyContext";

function Routes() {
  const [values, setValue] = useState({
    user: "",
    roleDefault: "petowner",
    role: "",
  });

  const updateValue = (key, value) => {
    setValue({ ...values, [key]: value });
    console.log(values);
  };

  return (
    <MyContext.Provider value={{ state: values, updateValue: { updateValue } }}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={!values.user ? LoginPage : Home} />
          <Route
            path="/register"
            component={values.role == "petowner" ? Petowner : Caretaker}
          />
          <Route path="/chat" component={ChatPage} />
        </Switch>
      </Router>
    </MyContext.Provider>
=======
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
>>>>>>> 25fcafa2f79b66fe64c4117007e4be2d9f38167e
  );
}

export default Routes;
