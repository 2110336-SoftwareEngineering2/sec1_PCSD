import React, { useContext } from "react";
import { UserContext } from "../context/MyContext";

import "./AddMoney.css";

function Addmoney() {
  const { user } = useContext(UserContext);

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('ehe');
  };

  return (
    <div className="addmoney">
      <div className="container d-flex justify-content-center mt-5">
        <div className="card">
          <form className="acard" onSubmit={onSubmit}>
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
              <div className="second pl-2 d-flex py-2">
                <div className="form-check">
                  {" "}
                  <input
                    type="radio"
                    name="optradio"
                    class="form-check-input mt-3 dot"
                  />{" "}
                </div>
                <div className="border-left pl-2">
                  <span class="head">Amount</span>
                  <div className="d-flex">
                    <span class="dollar">฿</span>
                    <input
                      type="number"
                      name="text"
                      class="form-control ml-1"
                      placeholder=""
                      min="50"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary button">
              Add Money
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addmoney;
