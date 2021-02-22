import React from "react";
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

