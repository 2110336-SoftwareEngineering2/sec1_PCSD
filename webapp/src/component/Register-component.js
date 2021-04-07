import React, { useContext, useState } from "react";
import "./style.css";
import "./script";
import history from "../history";
import { RegisterContext } from "../context/MyContext";

function Register() {
  const context = useContext(RegisterContext);
  const [values, setValue] = useState({
    role: "",
    gender: "",
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };

  const setData = () => {
    context.setData(values);
  };

  return (
    <li>
      <div className="content__wrapper">
        <form
          method="POST"
          onSubmit={() => {
            history.push({ pathname: "/user_register" });
            setData();
          }}
        >
          <div className="nameja">
            <input
              type="fname"
              name="firstname"
              placeholder="First name"
              value={values.firstname}
              onChange={onChange}
            />

            <input
              type="lname"
              name="lastname"
              placeholder="Surname"
              value={values.lastname}
              onChange={onChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={onChange}
          />
          <input
            type="tel"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={values.mobileNumber}
            onChange={onChange}
          />
          <input
            autoComplete="new-password"
            type="password"
            name="password"
            placeholder="New Password"
            value={values.password}
            onChange={onChange}
          />
          <div className="gender">
            <label> Gender: </label>
            <div className="gendercol">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                onChange={onChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="gendercol">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                onChange={onChange}
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
                required
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
                required
              />
              <label htmlFor="ct">Caretaker</label>
            </div>
          </div>
          <input type="submit" value="Sign Up" name="register" />
        </form>
      </div>
    </li>
  );
}

export default Register;
