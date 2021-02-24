import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";

import BanPage from "./banpage";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import history from "./history";
import ChatPage from "./Chat/chat";
import MyContext from "./component/MyContext";
import UpdateInfo from "./UpdateInfo/UpdateInfo";
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
          <Route path="/banpage" component={BanPage} />
          <Route
            path="/updateinfo"
           /* component={
              values.role == "petowner"
                ? UpdateInfoPetowner
                : UpdateInfoCaretaker
            } */
            component = {UpdateInfo}
          />
        </Switch>
      </Router>
    </MyContext.Provider>
  );
}

export default Routes;
