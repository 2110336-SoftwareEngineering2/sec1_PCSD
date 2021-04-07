import axios from "axios";
import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { UserContext } from "../context/MyContext";

import "./AddMoney.css";

function Addmoney() {
  const { user, login } = useContext(UserContext);

  const onClick = () => {
    const balance = document.getElementById("amount").value;

    axios
      .post(
        "http://localhost:4000/user/topup",
        { email: user.email, value: balance },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((res) => {
        const updateUser = { ...user, balance: res.data.balance };
        login(updateUser);
        window.alert(`${balance}฿ added to your account`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="addmoney">
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="acard">
            <div className="d-flex pt-3 pl-3" id="headerr">
              <div>
                <Avatar src={user.imgURL} />{" "}
              </div>
              <div className="mt-3 pl-2">
                <span className="name">
                  {user.firstname} {user.lastname}
                </span>
                <div className="crosss">
                  <span className="cross">Account Balance :</span>
                  <span className="pin ml-2">
                    {user.balance.$numberDecimal}
                  </span>
                </div>
              </div>
            </div>
            <div className="py-2 px-3">
              <div className="second pl-2 d-flex py-2">
                <div className="form-check"> </div>
                <div className="border-left pl-2">
                  <span className="head">Amount</span>
                  <div className="d-flex">
                    <span className="dollar">฿</span>
                    <input
                      type="number"
                      id="amount"
                      class="form-control ml-1"
                      placeholder=""
                      min="50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-primary button"
              onClick={onClick}
            >
              Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addmoney;
