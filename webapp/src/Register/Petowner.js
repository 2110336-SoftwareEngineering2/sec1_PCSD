import React, {useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Petowner.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";
function Petowner() {
  const [values, setValue] = useState({
    firstname: "Firstname",
    lastname: "Lastname",
    username: "Username"});
  
  function onChange(e) {
    setValue({...values, [e.target.name]: e.target.value})
  }
  
  return (
    <div className="petowner">
        <UserProfile uInfo = {values}/>
        <UserInfo infotype="Pet Owner" onChange = {onChange} />
        {/*User Info*/}
    </div>

  );
}

export default Petowner;