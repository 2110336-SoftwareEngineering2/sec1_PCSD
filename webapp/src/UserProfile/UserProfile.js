import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./ProfileForm";
import "./UserProfile.css";
import "./FormComponents.css";

import history from "../history";
import axios from "axios";

function UserProfile() {
  const { user, login } = useContext(UserContext);

  const [imageReady, setImageReady] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [validUsername, setValidUsername] = useState(true);

  const [info, setInfo] = useState({
    ...user,
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (!imageReady || !saved) return;
    history.push("/profile");
    history.go();
  }, [imageReady, saved]);

  function updateInfo(name, value) {
    setInfo({ ...info, [name]: value });
    if (name === "username") checkAvailability(value);
  }

  function updateImage(imgFile) {
    setInfo({ ...info, userImg: imgFile, hasImg: true });
    setImageReady(false);
  }

  function saveInfo() {
    setSubmitted(true);
    const editedUser = { ...info, id: info._id, password: info.new_password };
    if (!editedUser.password) delete editedUser.password;
    axios
      .post("http://localhost:4000/user/edit", editedUser)
      .then((res) => {
        login(res.data);
        if (info.hasImg) uploadProfilePic(res.data, info.userImg);
        setSaved(true);
      })
      .catch((err) => {
        console.error(err);
        console.log(err);
        setSubmitted(false);
        checkAvailability(info.username);
      });
    console.log("submitted");
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

  function checkAvailability(username) {
    if (!username) {
      setValidUsername(false);
      return;
    }
    axios
      .get(`http://localhost:4000/user/profile/${username}`)
      .then((res) => {
        setValidUsername(
          typeof res.data === "string" || res.data._id === user._id
        );
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
      <div id="user_profile" className="row py-4">
        <div className="col-12 col-md-4">
          <ProfileCard
            info={info}
            updateImage={updateImage}
            submitted={submitted}
          />
        </div>
        <div className="col-12 col-md-8">
          <ProfileForm
            input={info}
            updateInput={updateInfo}
            valid={validUsername}
            submitForm={saveInfo}
            submitted={submitted}
          />
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
