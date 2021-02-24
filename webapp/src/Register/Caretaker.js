import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Caretaker.css";
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo";

function Caretaker() {
  const [values, setValue] = useState({
    firstname: "Firstname",
    lastname: "Lastname",
    username: "Username"});
  
  const [isNext, setIsNext] = useState(false);
      const profileControl = () => {
        setIsNext(true);
      };

  function onChange(e) {
    setValue({...values, [e.target.name]: e.target.value})
  }
  
  return (
    <div className="caretaker">
      {isNext ? null : <UserProfile uInfo={values} />}
      <UserInfo func={profileControl} infotype="Caretaker" onChange={onChange}/>
    </div>
  );
}

export default Caretaker;
