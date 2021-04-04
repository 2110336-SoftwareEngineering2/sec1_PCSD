import React, { useContext } from "react";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import ProfileCard from "./ProfileCard";
import EditForm from "./EditForm";

function UserProfile(props) {
  return (
    <div>
      <Header />
      <div className="row py-4">
        <div className="col col-12 col-md-4">
          <ProfileCard />
        </div>
        <div className="col col-12 col-md-8">
          <EditForm />
        </div>
      </div>
    </div>
  );
}
export default UserProfile;
