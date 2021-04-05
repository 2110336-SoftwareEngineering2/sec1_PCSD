import React, { useContext, useState, useRef, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { useCookies } from "react-cookie";
import axios from "axios";
import {Avatar} from "@material-ui/core";
import { UserContext } from "../context/MyContext";
import { sentNotification } from "../Notification/NotificationUtils";
import history from "./../history";
import "./Payment.css";
// function Payment({receiverEmail, amount}) {
function Payment() {
  const { user } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  var reserveData = cookie.reserveTmp;
  const receiverEmail = reserveData.caretaker;
  const socketRef = useRef();
  const amount = (reserveData.endDate - reserveData.startDate) * reserveData.rate / (3600 * 1000);
  const notiEndPoint = "http://localhost:5000";
  reserveData["amount"] = amount;
  
  useEffect(async () => {
    // console.log(reserveData)
    socketRef.current = socketIOClient(notiEndPoint, {
        query: {
            user: user.email
        }
    });

    return () => {
        socketRef.current.disconnect();
    };
  });
  // strub
//  console.log(receiverEmail);
  console.log(user)
  const [state, setState] = useState(reserveData);

  const sentReserveNotification= () => {
    const sender = user.email;
    const receiver = receiverEmail;
    const type = "RESERVE"
    sentNotification(socketRef.current, sender, receiver, type);
  }
  
  const onClick = () => {
    console.log(state);
    axios
      .post("http://localhost:4000/reserve/caretaker", state, {
        headers: {authorization: "Bearer " + cookie.accessToken}
      })
      .then((res) => {
        console.log(res.data);
        sentReserveNotification();
        window.alert(`$${state.amount} has been sent to ${state.caretaker}`);
        history.push({pathname: "/"});
      })
      .catch(err =>{
        console.log(err);
        window.alert(err);
      })
  };

  return (
    <div className="payment">
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="bcard">
            <div className="d-flex pt-3 pl-3" id="header">
              <div>
                <Avatar
                  src={"https://pcsdimage.s3-us-west-1.amazonaws.com/"+user.email}
                />{" "}
              </div>
              <div className="mt-3 pl-2">
                <span class="name">
                  {user.firstname} {user.lastname}
                </span>
                <div className="crosss">
                  <span className="cross">Account Balance :</span>
                  <span class="pin ml-2">{user.balance.$numberDecimal}</span>
                </div>
              </div>
            </div>
            <div className="py-2 px-3">
              <div class="first pl-2 d-flex py-2">
                <div className="form-check">
                  {" "}
                  
                </div>
                <div className="border-left pl-2">
                  <span className="head">Total amount due</span>
                  <div>
                    <span className="dollar">฿ </span>
                    <span className="amount">{amount}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-between px-3 pt-4 pb-3">
              <div>
                <span
                  className="backk"
                  onClick={() => {
                    history.push({ pathname: "/" });
                  }}
                >
                  Cancel
                </span>
              </div>{" "}
              <button
                type="button"
                class="btn btn-primary button pay"
                onClick={onClick}
              >
                Pay amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
