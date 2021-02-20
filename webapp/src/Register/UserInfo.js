import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./UserInfo.css";
import Register_info from "./Register_info";
import Register_header from "./Register_header";
function UserInfo() {
  return (
    <div className="userInfo">
      <Register_header />
      <Register_info  />
      {/*regis_header*/}
      {/*regis_info*/}
    </div>

  );
}

export default UserInfo;

