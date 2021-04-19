import React from 'react'
import Header from './../Header/header';
import Addmoney from "./AddMoney";
import "./AddMoneyPage.css";
function AddMoneyPage() {
    return (
        <div className="addmoneypage">
           <Header />
           <Addmoney />
        </div>
    )
}

export default AddMoneyPage;
