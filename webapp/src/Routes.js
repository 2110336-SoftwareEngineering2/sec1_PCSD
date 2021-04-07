import React, { useContext } from "react";
import { Router, Switch, Route } from "react-router-dom";

import history from "./history";
import BanPage from "./banpage";
import LoginPage from "./LoginPage";
import Home from "./Home/Home";
import ChatPage from "./Chat/chat";
import SearchPage from "./SearchPage/SearchPage";
import ReservePage from "./ReserveCaretaker";
import History_Card from "./History_Card/History_Card";
import SearchResult from "./SearchPage/SearchResult";
import { RegisterContext, UserContext } from "./context/MyContext";
import AuthRoute from "./util/AuthRoute";
import { useCookies } from "react-cookie";

import ShowMoneyPage from "./Payment/ShowMoneyPage";
import AddMoneyPage from "./Payment/AddMoneyPage";
import PaymentPage from "./Payment/PaymentPage";
import UserPage from "./UserPage/UserPage";
import ReserveForm from "./ReserveForm/ReserveForm";

import RegisterProfile from "./RegisterProfile/RegisterProfile";
import UserProfile from "./UserProfile/UserProfile";
import MyPets from "./MyPets/MyPets";
import MyServices from "./MyServices/MyServices";

import NewLogin from "./UserLogin/LoginPage";

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

        <Route path="/newlogin" exact component={NewLogin} />
        <Route path="/user_register" exact component={RegisterProfile} />

        <AuthRoute path="/searchpage" exact component={SearchPage} />
        <AuthRoute path="/searchresult" exact component={SearchResult} />
        <AuthRoute path="/reservepage" exact component={ReservePage} />
        <AuthRoute path="/chat" exact component={ChatPage} />
        <AuthRoute path="/banpage" exact component={BanPage} />

        <AuthRoute path="/user/:username" exact component={UserPage} />
        <AuthRoute path="/historycard" exact component={History_Card} />

        <AuthRoute path="/profile" exact component={UserProfile} />
        <AuthRoute path="/pets" exact component={MyPets} />
        <AuthRoute path="/services" exact component={MyServices} />

        <AuthRoute path="/addmoney" exact component={AddMoneyPage} />
        <AuthRoute path="/showmoney" exact component={ShowMoneyPage} />
        <AuthRoute path="/payment" exact component={PaymentPage} />
        <AuthRoute path="/reserveform" exact component={ReserveForm} />
      </Switch>
    </Router>
  );
}

export default Routes;
