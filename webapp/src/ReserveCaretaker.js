import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./ReserveCaretaker.css";
import image from "./userpic.png";
import Header from "./Header/header"
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';

function ReserveCaretaker() {
    
    return (
        <div className="reserve">
            <Header/>
            <div className="reserve_background">
                <div className="reserve_container">
                    <div className="row">
                        <div className="col-3 reserve_img">
                            <img className="reserveimg" src={image}/>
                        </div>
                        <div className="col-9 reserve_userinfo">
                            <label className="namelabel">Firstname &nbsp; Surname</label><br/>
                            <label className="greylabel">description description description description description description</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 reserve_contact">
                            <RoomOutlinedIcon fontSize="large"/>
                            <label className="datalabel">Service Area</label><br/>
                            <PhoneRoundedIcon fontSize="large"/>
                            <label className="datalabel">Phone Number</label><br/>
                            <MailOutlinedIcon fontSize="large"/>
                            <label className="datalabel">Email</label>
                        </div>
                        <div className="col-7 reserve_service">
                            <label className="greylabel">Service Type:</label>
                            <label className="datalabel">Service Type</label><br/>
                            <label className="greylabel">Pet Type:</label>
                            <label className="datalabel">Pet Type</label><br/>
                            <label className="greylabel">Available Day(s):</label>
                            <label className="datalabel">Days</label><br/>
                            <label className="greylabel">Rate per hour (baht):</label>
                            <label className="datalabel">Rate</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 reserve_button">
                            <button>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReserveCaretaker;