import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Petowner.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";
function Petowner() {
  const [fname, setFName] = useState("fName");
  const [sname, setSName] = useState("sName");
  const [username, setUserName] = useState("username");

  function onfName(fName){
    setFName(fName);
  }
  function onsName(sName){
    setSName(sName);
  }
  function onUsername(uName){
    setUserName(uName);
  }
  console.log(fname, sname, username);
  const uInfo = {fname, sname, username}
  return (
    <div className="petowner">
        <UserProfile uInfo = {uInfo}/>
        <UserInfo infotype="Pet Owner" updateFunc = {{onfName, onsName, onUsername}}/>
        {/*User Info*/}
    </div>

  );
}

export default Petowner;