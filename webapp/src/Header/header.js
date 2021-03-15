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
import { DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="header">
      <div className="header__left">
        <div className="header__logo" onClick={() => {
              history.push({ pathname: "/" });
            }}>
          <img src={petidcare} alt="" />
          <h4>Petidcare</h4>
        </div>
        <div className="header__input">
          <SearchIcon />
          <label>Search for caketakers</label>
        </div>
        </div>
      <div className="header__right">
        <IconButton>
          <NotificationsIcon/>
        </IconButton>
        <IconButton>
          <MailIcon onClick={() => {
              history.push({ pathname: "/chat" });
            }}/>
        </IconButton>
        <hr />
        <div className="header__profile">
          <DropdownButton
          menuAlign="right"
          title= {<div class="user_infoo"> <Avatar /> &nbsp; {user.username} </div>}
          id="dropdown-menu-align-right" >
        <Dropdown.Item eventKey="1" onClick={() => {
              history.push({ pathname: "/updateinfo" });
            }}> edit your profile
        </Dropdown.Item>
       {user.username == "admin" ? <Dropdown.Item eventKey="2" onClick={() => {
              history.push({ pathname: "/banpage" });
            }}>Ban Status </Dropdown.Item> : null }

        <Dropdown.Divider />
      <Dropdown.Item eventKey="4" onClick={() => {
              logout();
            }}><ExitToAppIcon/> Log out</Dropdown.Item>
      </DropdownButton>
        </div>
      </div>
    </div>
  );
}

export default Header;

