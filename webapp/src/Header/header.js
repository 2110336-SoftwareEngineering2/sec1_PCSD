import React, { useContext } from "react";
import petidcare from "../petidcareOnlyLogo.png";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar, IconButton } from "@material-ui/core";
import history from "./../history";
import { UserContext } from "../context/MyContext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="header">
      <div className="header__left">
        <div
          className="header__logo"
          onClick={() => {
            history.push({ pathname: "/" });
          }}
        >
          <img src={petidcare} alt="" />
          <h4>Petidcare</h4>
        </div>
        <div className="header__input" onClick={() => {
            history.push({ pathname: "/searchpage" });
          }}>
          <SearchIcon />
          <label className="header__label">Search for caketakers</label>
        </div>
      </div>
      <div className="header__right">
        <IconButton>
          <NotificationsIcon onClick={() => {
            history.push({ pathname: "/reservepage" });
          }}/>
        </IconButton>
        <IconButton>
          <MailIcon
            onClick={() => {
              history.push({ pathname: "/chat" });
            }}
          />
        </IconButton>
        <hr />
        <div className="header__profile">
          <DropdownButton
            menuAlign="right"
            title={
              <div className="user_infoo">
                {" "}
                <Avatar src={"https://pcsdimage.s3-us-west-1.amazonaws.com/"+ user.email}/> &nbsp; {user.username}{" "}
              </div>
            }
            id="dropdown-menu-align-right"
          >
            <Dropdown.Item
              eventKey="1"
              onClick={() => {
                history.push({ pathname: "/updateinfo" });
              }}
            >
              {" "}
              edit your profile
            </Dropdown.Item>
            {user.username == "admin" ? (
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  history.push({ pathname: "/banpage" });
                }}
              >
                Ban Status{" "}
              </Dropdown.Item>
            ) : null}

            <Dropdown.Divider />
            <Dropdown.Item
              eventKey="4"
              onClick={() => {
                logout();
              }}
            >
              <ExitToAppIcon /> Log out
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}

export default Header;