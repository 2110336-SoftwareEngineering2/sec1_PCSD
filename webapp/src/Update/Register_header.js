import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Register_header.css";
function Register_header(props) {
  return (
    <div className="register_header">
       <p>Edit {props.title}'s Profile</p>
    </div>

  );
}

export default Register_header;


