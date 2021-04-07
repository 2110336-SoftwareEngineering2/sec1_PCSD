import React, { useState, useContext, useEffect } from "react";
import { RegisterContext, UserContext } from "../context/MyContext";

import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import "./RegisterProfile.css";
import "./FormComponents.css";

import history from "../history";
import axios from "axios";

function RegisterProfile() {
  const { data } = useContext(RegisterContext);
  const { login } = useContext(UserContext);

  const [user, setUser] = useState(false);
  const [imageReady, setImageReady] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const [validEmail, setValidEmail] = useState(null);
  const [validUsername, setValidUsername] = useState(null);

  const [info, setInfo] = useState({
    ...data,
    username: "",
    confirm_password: "",
    gender: data.gender === "" ? null : data.gender,
  });

  const setValid = { email: setValidEmail, username: setValidUsername };

  useEffect(() => {
    checkAvailability({ email: data.email, username: data.username });
  }, []);

  useEffect(() => {
    if (!imageReady || !user) return;
    axios
      .post("http://localhost:4000/auth/login", user)
      .then((res) => {
        console.log(res.data);
        login(res.data);
        history.push(user.role === "petowner" ? "/pets" : "/services");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [imageReady, user]);

  function updateInfo(name, value) {
    setInfo({ ...info, [name]: value });
    if (["username", "email"].includes(name))
      checkAvailability({ [name]: value });
  }

  function saveInfo() {
    setSubmitted(true);
    const newUser = { ...info, banStatus: false, balance: 0 };
    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((res) => {
        console.log(res);
        if (info.userImg) uploadProfilePic(res.data, info.userImg);
        setUser({ ...res.data, password: newUser.password });
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data);
        setSubmitted(false);
        checkAvailability({ email: info.email, username: info.username });
      });
    console.log("submitted");
  }

  function checkAvailability(input) {
    for (let name in input) {
      if (!input[name]) {
        setValid[name](false);
        return;
      }

      const path = name === "username" ? "profile" : "email";
      axios
        .get(`http://localhost:4000/user/${path}/${input[name]}`)
        .then((res) => {
          setValid[name](typeof res.data === "string");
        })
        .catch((err) => console.log(err));
    }
  }

  function uploadProfilePic(user, img) {
    const data = new FormData();
    data.append("email", user.email);
    data.append("file", img);
    console.log(data);
    axios
      .post("http://localhost:4000/user/profilepic", data)
      .then((res) => {
        console.log(res);
        setImageReady(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div id="register_profile" className="row py-4">
        <div className="col-12 col-md-4">
          <ProfileCard
            info={info}
            updateImage={setInfo}
            submitted={submitted}
          />
        </div>
        <div className="col-12 col-md-8">
          <ProfileForm
            input={info}
            updateInput={updateInfo}
            valid={{ email: validEmail, username: validUsername }}
            submitForm={saveInfo}
            submitted={submitted}
          />
        </div>
      </div>
    </div>
  );
}
export default RegisterProfile;
