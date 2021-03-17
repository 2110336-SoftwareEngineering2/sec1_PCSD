import React, { useContext, useState} from "react";
import "./Petowner.css";
import Header from "./../Header/header";
import UserProfile from "./Update_profile";
import UserInfo from "./UserInfo";
import { UserContext } from "../context/MyContext";

function UpdatePetowner() {
  const context = useContext(UserContext);
  const user = (({
    username,
    firstname,
    lastname,
    email,
    mobileNumber,
    gender,
  }) => ({ username, firstname, lastname, email, mobileNumber, gender }))(
    context.user
  );
  const [values, setValue] = useState({
    ...user,
  });
  
  function onChange(e) {
    setValue({...values, [e.target.name]: e.target.value})
  }

  return (
    <div className="updatepetowner">
      <Header />
        <div className="info">
        <UserProfile uInfo = {values}/>
        <UserInfo infotype="Pet Owner" onChange = {onChange} />
        </div>
    </div>

  );
}

export default UpdatePetowner;