import React, { useContext, useEffect, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { UserContext } from "../context/MyContext";
import { Avatar, Button, IconButton } from "@material-ui/core";
import "./Notification.css";

// var notification = {
//         sender: {
//             email: "petowner@email.com",
//             fname: "Pet",
//             lname: "Owner"
//         },
//         reciever: {
//             email: "caretaker@email.com",
//             fname: "Care",
//             lname: "Taker"
//         },
//         title: "Reservation",
//         detail: "Pet Owner has reserved you.",
//         timestamp: 1617618603000,
//     }
const Notification = ({ notification }) => {
  const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    return date.toTimeString().slice(0, 9) + " " + date.toLocaleDateString();
  }
  return (
    <Dropdown.Item>
      <div className="notification-item">
        <Avatar
          className="notification-item-pic"
          src={
            "https://pcsdimage.s3-us-west-1.amazonaws.com/" +
            notification.sender.email
          }
        />
        <div className="notification-item-detail">
          <h3>{notification.title} </h3>
          <p>{notification.detail}</p>
          <span style={{ fontSize: "0.8rem" }}>
            {getDateString(notification.timestamp)}
          </span>
        </div>
      </div>
      <hr />
    </Dropdown.Item>
  );
};

export default Notification;
