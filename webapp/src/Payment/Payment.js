import React, { useContext } from 'react';
import { UserContext } from "../context/MyContext";
import "./Payment.css";
function Payment() {
    const { user } = useContext(UserContext);
    return (
        <div>
             <div className="container d-flex justify-content-center mt-5">
    <div className="card">
        <div className="bcard">
            <div className="d-flex pt-3 pl-3">
                <div><img src={"https://pcsdimage.s3-us-west-1.amazonaws.com/"+ user.email} width="80" height="80"/> </div>
                <div className="mt-3 pl-2"><span class="name">{user.firstname} {user.lastname}</span>
                    <div><span className="cross">Account Balance :</span><span class="pin ml-2">{user.money}</span></div>
                </div>
            </div>
            <div className="py-2 px-3">
            <div class="first pl-2 d-flex py-2">
                    <div className="form-check"> <input type="radio" name="optradio" className="form-check-input mt-3 dot" checked/> </div>
                    <div className="border-left pl-2"><span className="head">Total amount due</span>
                        <div><span className="dollar">฿ </span><span className="amount">8245</span></div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-between px-3 pt-4 pb-3">
                <div><span className="back">Cancle</span></div> <button type="button" class="btn btn-primary button pay">Pay amount</button>
            </div>
        </div>
    </div>
</div>
        </div>
    )
}

export default Payment;
