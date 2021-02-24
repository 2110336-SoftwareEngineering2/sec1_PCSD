import React, { useState } from "react";
import "./style.css";
import "./script";
import history from "./../history";
import MyContext from "./MyContext";

function Register() {
  const [values, setRole] = useState({ role: "", gender: "" });

  const onChange = (e) => {
    setRole({ ...values, [e.target.name]: e.target.value });
  };

  const setData = (context) => {
    context.updateValue.updateValue("role", values.role);
  };

  return (
    <MyContext.Consumer>
      {(context) => {
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
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                    />
                    <label htmlFor="female">Female</label>
                  </div>
                </div>
                <div className="gender">
                  <label> Register as: </label>

                  <div className="gendercol">
                    <input
                      type="radio"
                      id="po"
                      name="role"
                      value="petowner"
                      onChange={onChange}
                    />
                    <label htmlFor="po">Pet Owner</label>
                  </div>
                  <div className="gendercol">
                    <input
                      type="radio"
                      id="ct"
                      name="role"
                      value="caretaker"
                      onChange={onChange}
                    />
                    <label htmlFor="ct">Caretaker</label>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Sign Up"
                  name="register"
                  onClick={() => {
                    history.push({ pathname: "/register" });
                    setData(context);
                  }}
                />
              </form>
            </div>
          </li>
        );
      }}
    </MyContext.Consumer>
  );
}

export default Register;
