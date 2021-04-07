import React, { useContext } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";
import BanPage from "./banpage";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import Caretaker from "./Register/Caretaker";
import Petowner from "./Register/Petowner";
import ChatPage from "./Chat/chat";
import SearchPage from "./SearchPage/SearchPage";
import ReservePage from "./ReserveCaretaker";
import History_Card from "./test/Test";
import SearchResult from "./SearchPage/SearchResult";
import { RegisterContext, UserContext } from "./context/MyContext";
import AuthRoute from "./util/AuthRoute";
import { useCookies } from "react-cookie";

import AddMoneyPage from "./Payment/AddMoneyPage";
import PaymentPage from "./Payment/PaymentPage";
import UserPage from "./UserPage/UserPage";
import ReserveForm from "./ReserveForm/ReserveForm";

import UserProfile from "./UserProfile/UserProfile";
import MyPets from "./MyPets/MyPets";
import MyServices from "./MyServices/MyServices";

function Routes() {
  const context = useContext(RegisterContext);
  const userContext = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          // component={!userContext.user ? LoginPage : Home}
          component={cookie.accessToken !== undefined ? Home : LoginPage}
        />
        <Route
          path="/register"
          component={context.data.role == "petowner" ? Petowner : Caretaker}
        />
        <AuthRoute path="/searchpage" component={SearchPage} />
        <AuthRoute path="/searchresult" component={SearchResult} />
        <AuthRoute path="/reservepage" component={ReservePage} />
        <AuthRoute path="/chat" component={ChatPage} />
        <AuthRoute path="/banpage" component={BanPage} />
        
        <AuthRoute path="/user/:username" exact component={UserPage} />
        <AuthRoute path="/test" exact component={History_Card} />

        <AuthRoute path="/profile" exact component={UserProfile} />
        <AuthRoute path="/pets" exact component={MyPets} />
        <AuthRoute path="/services" exact component={MyServices} />

        <AuthRoute path="/addmoney" exact component={AddMoneyPage} />
        <AuthRoute path="/payment" exact component={PaymentPage} />
        <AuthRoute path="/reserveform" exact component={ReserveForm} />
      </Switch>
    </Router>
  );
}

export default Routes;
