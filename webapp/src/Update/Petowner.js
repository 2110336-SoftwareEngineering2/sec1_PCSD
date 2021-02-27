import React, { useContext, useState} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Petowner.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";
import { RegisterContext } from "../context/MyContext";
function UpdatePetowner() {
  const context = useContext(RegisterContext);
  const [values, setValue] = useState({
    ...context.data,
    username: ""});
  
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

export default UpdatePetowner;