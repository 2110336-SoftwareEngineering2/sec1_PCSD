import React, { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import {Avatar} from "@material-ui/core";
import { UserContext } from "../context/MyContext";
import history from "./../history";
import "./Payment.css";
function Payment({receiverEmail, amount}) {
  const { user } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  
  // strub
 console.log(receiverEmail);

  const [state, setState] = useState({
    receiverEmail: receiverEmail ,
    amount: amount,
  });
  
  const onClick = () => {
    console.log("pay");
    console.log(state);
    axios
      .post("http://localhost:4000/user/transfer?type=transfer", state, {
        headers: { authorization: "Bearer " + cookie.accessToken },
      })
      .then((res) => {
        console.log(res.data);
        window.alert(`$${state.amount} has been sent to ${state.receiverEmail}`);
      })
      .catch((err) => {
        console.log(err);
        window.alert(`ERROR!!!!`);
      });
      history.push({ pathname: "/" });
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
