import React, { useState, useContext } from "react";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import ProfileCard from "./ProfileCard";
import ProfileForm from "./EditForm";
import "./UserProfile.css";
import "./FormComponents.css";

import history from "./../history";
import axios from "axios";

function UserProfile() {
  const { user, login } = useContext(UserContext);
  const [info, setInfo] = useState({
    ...user,
    new_password: "",
    confirm_password: "",
  });
  const [invalidUsername, setInvalidUsername] = useState(null);

  function saveInfo() {
    const editedUser = { ...info, id: info._id, password: (info.new_password || info.password) };
    axios
      .post("http://localhost:4000/user/edit", editedUser)
      .then((res) => {
        login(res.data);
        history.push("/profile");
        history.go();
      })
      .catch((err) => {
        console.error(err);
        console.log(err);
        setInvalidUsername(info.username);
      });
    console.log("submitted");
  }

  return (
    <div>
      <Header />
      <div id="user_profile" className="row py-4">
        <div className="col-12 col-md-4">
          <ProfileCard info={info} updateImage={setInfo} />
        </div>
        <div className="col-12 col-md-8">
          <ProfileForm
            input={info}
            updateInput={setInfo}
            submitForm={saveInfo}
            invalidUsername={invalidUsername}
          />
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
