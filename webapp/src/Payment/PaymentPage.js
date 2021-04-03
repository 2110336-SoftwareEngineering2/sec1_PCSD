import React from 'react'
import Header from './../Header/header';
import Payment from "./Payment";
import "./PaymentPage.css";
function PaymentPage(props) {
    console.log(props);
    return (
        <div>
            <Header />
            <Payment receiverEmail={props.location.reserve.caretaker} amountt={props.location.reserve.amount}/>
        </div>
    )
}

export default PaymentPage;
