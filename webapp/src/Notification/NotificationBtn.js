import NotificationsIcon from "@material-ui/icons/Notifications";
import React, { useContext, useEffect, useState, useRef } from "react";
import history from "./../history";
import socketIOClient from "socket.io-client";
import { useCookies } from "react-cookie";
import { UserContext } from "../context/MyContext";
// import { expr } from "jquery";
import { Avatar, Button, IconButton } from "@material-ui/core";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Notification from "./Notification";

const NotificationBtn = () => {
    const userContext = useContext(UserContext);
    const socketRef = useRef();
    const endPoint = "http://localhost:5000";
    const [notifications, setNotifications] = useState([]);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(async () => {
        socketRef.current = socketIOClient(endPoint, {
            query: {
                user: userContext.user.email
            }
        });

        socketRef.current.on("new-noti", (res) => {
            var newNoti = [res, ...notifications];
            setNotifications(newNoti);
            console.log(notifications)
        })

        return () => {
            socketRef.current.disconnect();
        };
    });

    const onClick = () => {
        console.log("Notit");
        // console.log(Date.now())
        var req = {
            detail: `Stack-${x}`,
            targetUser: "caretaker@email.com"
        }
        socketRef.current.emit("sent-noti", req);
        setX(x+1);
    }

    const testclick = () => {
        var data = {
            x: x,
            targetUser: "petowner@email.com"
        }
        socketRef.current.emit("test", data);
        setY(y+1);
    }

    return (
        <IconButton >
            <NotificationsIcon onClick={() => onClick()} />

            {userContext.user.email === "caretaker@email.com" ? x : 0}
            {/* <Button onClick={() => testclick()}>Rsd</Button> */}
            <DropdownButton
                title={
                    <div>
                        <NotificationsIcon />
                        {userContext.user.email === "caretaker@email.com" ? x : 0}
                    </div>
                }
            >
                {/* {x} */}
                {/* {console.log(notifications)} */}
                {notifications.map((notification, idx) => {
                    return <Notification notification={notification} />
                })}
            </DropdownButton>
        </IconButton>
    );
}

export default NotificationBtn;