import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import petidcare from "./petidcare.png";

function Logo() {

  return (
    <div className="logo">
  <img src={petidcare} />
            <p>
            online matching platform
for caretakers and pet owners
            </p>
    </div>

  );
}

export default Logo;

