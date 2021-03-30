import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./Register_header.css";
function Register_header(props) {
  return (
    <div className="register_header">
       <p>Register as {props.title}</p>
    </div>

  );
}

export default Register_header;


