import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

import { UserContext } from "../context/MyContext";
import history from "./../history";
import "./Payment.css";
function Payment({receiverEmail, amountt}) {
  const { user } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  // strub
 console.log(amountt);
  const [state, setState] = useState({
    receiverEmail: {receiverEmail} ,
    amount: 500,
  });

  const onClick = () => {
    console.log("pay");
    axios
      .post("http://localhost:4000/user/transfer?type=transfer", {
        receiverEmail: {receiverEmail} ,
        amount: 500,
      }, {
        headers: { authorization: "Bearer " + cookie.accessToken },
      })
      .then((res) => {
        console.log(res.data);
        window.alert(`$${state.amount} has been sent to ${state.receiverEmail}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="bcard">
            <div className="d-flex pt-3 pl-3">
              <div>
                <img
                  src={
                    "https://pcsdimage.s3-us-west-1.amazonaws.com/" + user.email
                  }
                  width="80"
                  height="80"
                />{" "}
              </div>
              <div className="mt-3 pl-2">
                <span class="name">
                  {user.firstname} {user.lastname}
                </span>
                <div>
                  <span className="cross">Account Balance :</span>
                  <span class="pin ml-2">{user.balance.$numberDecimal}</span>
                </div>
              </div>
            </div>
            <div className="py-2 px-3">
              <div class="first pl-2 d-flex py-2">
                <div className="form-check">
                  {" "}
                  <input
                    type="radio"
                    name="optradio"
                    className="form-check-input mt-3 dot"
                    checked
                  />{" "}
                </div>
                <div className="border-left pl-2">
                  <span className="head">Total amount due</span>
                  <div>
                    <span className="dollar">฿ </span>
                    <span className="amount">{amountt}</span>
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
