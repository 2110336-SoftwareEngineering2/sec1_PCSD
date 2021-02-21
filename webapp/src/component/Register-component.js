import React, { useState } from "react";
import "./style.css";
import "./script";
import history from "./../history";
import { Route } from "react-router-dom";
import Routes from "./../Routes";
function Register() {
  const [role, setRole] = useState("");
  return (
    <li>
      <div className="content__wrapper">
        <form method="POST" action="">
          <div className="nameja">
            <input type="fname" name="fname" placeholder="First name" />

            <input type="lname" name="lname" placeholder="Surname" />
          </div>
          <input type="email" name="email" placeholder="Email address" />
          <input type="tel" name="tel" placeholder="Mobile Number" />
          <input type="pass" name="pass" placeholder="New Password" />
          <div className="gender">
            <label> Gender: </label>
            <div className="gendercol">
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male">Male</label>
            </div>
            <div className="gendercol">
              <input type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <div className="gender">
            <label> Register as: </label>

            <div className="gendercol">
              <input type="radio" id="po" name="user" value="Petowner" 
              onChange = { (e) => setRole(e.target.value)}
              />
              <label htmlFor="po">Pet Owner</label>
            </div>
            <div className="gendercol">
              <input type="radio" id="ct" name="user" value="Caretaker" 
              onChange = { (e) => setRole(e.target.value)}/>
              <label htmlFor="ct">Caretaker</label>
            </div>
          </div>
          <input
            type="submit"
            value="Sign Up"
            name="register"
            onClick={() => history.push("/register")}
          />
        </form>
      </div>
    </li>
  );
}

export default Register;
