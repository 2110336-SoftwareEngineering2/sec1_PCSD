import React, { useContext } from "react";
import { UserContext } from "../context/MyContext";

import "./AddMoney.css";

function Addmoney() {
  const { user } = useContext(UserContext);

  const onClick = () => {
    const balance = document.getElementById('amount').value;

    console.log(balance);
  };

  return (
    <div className="addmoney">
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <div className="acard">
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
                <span className="name">
                  {user.firstname} {user.lastname}
                </span>
                <div>
                  <span className="cross">Account Balance :</span>
                  <span className="pin ml-2">{user.balance.$numberDecimal}</span>
                </div>
              </div>
            </div>
            <div className="py-2 px-3">
              <div className="second pl-2 d-flex py-2">
                <div className="form-check">
                  {" "}
                  <input
                    type="radio"
                    name="optradio"
                    className="form-check-input mt-3 dot"
                  />{" "}
                </div>
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
            <button type="submit" className="btn btn-primary button" onClick={onClick}>
              Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addmoney;
