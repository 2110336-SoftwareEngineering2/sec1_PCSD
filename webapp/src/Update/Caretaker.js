import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Caretaker.css";
import UserProfile from "./Update_profile";
import UserInfo from "./UserInfo";
import { UserContext } from "../context/MyContext";
import Header from "./../Header/header";

function UpdateCaretaker() {
  const context = useContext(UserContext);
  const [values, setValue] = useState({
    ...context.user,
  });
  
  const [isNext, setIsNext] = useState(false);
      const profileControl = () => {
        setIsNext(true);
      };

  function onChange(e) {
    setValue({...values, [e.target.name]: e.target.value})
  }
  
  return (
    <div className="updatecaretaker">
      <Header />
      <div className="info">
      {isNext ? null : <UserProfile uInfo={values} />}
      <UserInfo func={profileControl} infotype="Caretaker" onChange={onChange}/>
      </div>
    </div>
  );
}

export default UpdateCaretaker;
