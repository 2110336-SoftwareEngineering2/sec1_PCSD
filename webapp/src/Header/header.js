import React, { useContext } from "react";
import petidcare from "../petidcareOnlyLogo.png";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailIcon from "@material-ui/icons/Mail";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, IconButton } from "@material-ui/core";
import history from "./../history";
import { UserContext } from "../context/MyContext";

function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo">
          <img src={petidcare} alt="" />
          <h4>Petidcare</h4>
        </div>
      </div>
      <div className="header__middle">
        <div className="header__input">
          <SearchIcon />
          <label>Search for caketakers</label>
        </div>
      </div>
      <div className="header__right">
        <IconButton>
          <NotificationsIcon
            onClick={() => {
              history.push({ pathname: "/updateinfo" });
            }}
          />
        </IconButton>
        <IconButton>
          <MailIcon
            onClick={() => {
              logout();
            }}
          />
        </IconButton>
        <hr />
        <div className="header__profile">
          <Avatar />
          <h4>{user.username}</h4>
          <IconButton>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
