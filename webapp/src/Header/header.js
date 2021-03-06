import React, { useContext, useEffect, useState, useRef } from "react";
import petidcare from "../petidcareOnlyLogo.png";
import "./header.css";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailIcon from "@material-ui/icons/Mail";
import { Avatar, Badge, IconButton } from "@material-ui/core";
import history from "./../history";
import { UserContext, ChatContext } from "../context/MyContext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import socketIOClient from "socket.io-client";
import { useCookies } from "react-cookie";
import NotificationBtn from "../Notification/NotificationBtn";

function Header() {
  const { user, logout } = useContext(UserContext);
  const [sumUnread, setSumUnread] = useState(0);
  const chatContext = useContext(ChatContext);
  const endpoint = "http://localhost:4000";
  const socketRef = useRef();
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  socketRef.current = socketIOClient(endpoint, {
    query: {
      room: user.email,
    },
  });

  useEffect(() => {
    socketRef.current.on("get-sum-unread", (res) => {
      setSumUnread(res.sum);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [sumUnread]);

  useEffect(() => {
    socketRef.current.emit("get-sum-unread", user.email);
  }, []);

  return (
    <div className="header" id="page_header">
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
        <div
          className="header__input"
          onClick={() => {
            history.push({ pathname: "/searchpage" });
          }}
        >
          <SearchIcon />
          <label className="header__label">Search for caketakers</label>
        </div>
      </div>
      <div className="header__right">
        <NotificationBtn />
        <IconButton>
          <Badge badgeContent={sumUnread} color="primary">
            <MailIcon
              onClick={() => {
                history.push({ pathname: "/chat" });
              }}
            />
          </Badge>
        </IconButton>
        <hr />
        <div className="header__profile">
          <DropdownButton
            menuAlign="right"
            title={
              <div className="user_infoo">
                <Avatar
                  src={
                    user.imgURL
                  }
                />
                &nbsp; {user.username}
              </div>
            }
            id="dropdown-menu-align-right"
          >
            <Dropdown.Item
              eventKey="1"
              onClick={() => history.push({ pathname: "/profile" })}
            >
              My Profile
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="8"
              onClick={() =>
                history.push(
                  {
                    pathname: user.role === "caretaker" ? "/services" : "/pets",
                  },
                )
              }
            >
              {user.role === "caretaker" ? "My Services" : "My Pets"}
            </Dropdown.Item>
            <Dropdown.Divider />
            {user.role == "caretaker" ? 
            <Dropdown.Item
            eventKey="5"
            onClick={() => {
              history.push({ pathname: "/showmoney" });
            }}
          >
            Account Balance
          </Dropdown.Item>
            :
            <Dropdown.Item
            eventKey="5"
            onClick={() => {
              history.push({ pathname: "/addmoney" });
            }}
          >
            Add Money
          </Dropdown.Item>
          }
            
            <Dropdown.Item
              eventKey="6"
              onClick={() => {
                history.push({ pathname: "/historycard" });
              }}
            >
              {user.role == "caretaker" ? "Job Histories" : "Payment Histories"}
            </Dropdown.Item>
            {user.username == "admin" ? (
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  history.push({ pathname: "/banpage" });
                }}
              >
                Ban Status
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
