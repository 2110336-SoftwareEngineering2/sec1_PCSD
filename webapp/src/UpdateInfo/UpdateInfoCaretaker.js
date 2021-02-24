import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Caretaker.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";

function UpdateInfoCaretaker() {
  return (
    <div className="caretaker">
      <UserProfile />
      <UserInfo infotype="Caretaker" />
    </div>
  );
}

export default UpdateInfoCaretaker;
