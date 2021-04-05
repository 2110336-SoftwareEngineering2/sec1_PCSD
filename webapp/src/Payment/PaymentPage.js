import React from 'react'
import Header from './../Header/header';
import Payment from "./Payment";
import "./PaymentPage.css";
function PaymentPage(props) {
    // console.log(props);
    return (
        <div>
            <Header />
            <Payment />
        </div>
    )
}

export default PaymentPage;
