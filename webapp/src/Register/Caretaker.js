import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Caretaker.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";

function Caretaker(props) {
  const [state, setState] = useState({
    isNext: false,
  });

  const profileControl = () => {
    setState({ isNext: true });
  };

  return (
    <div className="caretaker">
      {state.isNext ? null : <UserProfile />}
      <UserInfo func={profileControl} infotype="Caretaker" />
    </div>
  );
}

export default Caretaker;
