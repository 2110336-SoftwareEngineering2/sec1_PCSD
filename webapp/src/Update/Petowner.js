import React, { useContext, useState} from "react";
import "./Petowner.css";
import Header from "./../Header/header";
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
      <Header />
        <div className="info">
        <UserProfile uInfo = {values}/>
        <UserInfo infotype="Pet Owner" onChange = {onChange} />
        </div>
    </div>

  );
}

export default UpdatePetowner;