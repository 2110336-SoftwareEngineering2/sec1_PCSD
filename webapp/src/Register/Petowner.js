import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Petowner.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";
function Petowner() {
  return (
    <div className="petowner">
        <UserProfile />
        <UserInfo infotype="Pet Owner"/>
        {/*User Info*/}
    </div>

  );
}

export default Petowner;