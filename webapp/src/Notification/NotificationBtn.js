import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useContext, useEffect, useState, useRef } from "react";
import history from "./../history";
import socketIOClient from "socket.io-client";
import { Cookies, useCookies } from "react-cookie";
import { UserContext } from "../context/MyContext";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Notification from "./Notification";
import axios from "axios";

const NotificationBtn = () => {
  const userContext = useContext(UserContext);
  const socketRef = useRef();
  const endPoint = "http://localhost:5000";
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  // const [y, setY] = useState(0);
  useEffect(async () => {
    axios
      .get(`http://localhost:4000/notifications/${userContext.user.email}`, {
        headerd: {
          authorization: "",
        },
      })
      .then((res) => {
        setNotifications(res.data.notifications);
        setUnread(res.data.unreadNotifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(async () => {
    socketRef.current = socketIOClient(endPoint, {
      query: {
        user: userContext.user.email,
      },
    });

    socketRef.current.on("new-unread-noti", (currentUnread) => {
      // console.log(currentUnread);
      setUnread(currentUnread);
    });

    socketRef.current.on("new-noti", (res) => {
      var newNoti = [res, ...notifications];
      setNotifications(newNoti);
      // setUnread(unread+1);
      // console.log(notifications)
    });

    return () => {
      socketRef.current.disconnect();
    };
  });

  const onClick = () => {
    // console.log('asdas')
    socketRef.current.emit("read", { user: userContext.user.email });
  };

  return (
    <IconButton id="my_noti">
      <DropdownButton
        onClick={onClick}
        title={
          <div style={{ display: "inline" }}>
            <NotificationsIcon />
            {/* {userContext.user.email === "caretaker@email.com" ? x : 0} */}
            <sub>({unread})</sub>
          </div>
        }
      > <div className = "Notification_Dropdown">
        {notifications.map((notification, idx) => {
          return <Notification notification={notification} />;
        })}
        </div>
      </DropdownButton>
    </IconButton>
  );
};

export default NotificationBtn;
