import React, { useState, useEffect } from "react";
import "./ReserveCaretaker.css";
import history from "./history";
import blankImage from "./userpic.png";
import Header from "./Header/header";
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import axios from "axios";

function ReserveCaretaker() {
    const userEmail = "testtttt@gmail.com";
    const img = "https://pcsdimage.s3-us-west-1.amazonaws.com/"+ userEmail;
    const [name, setName] = useState({firstname: null, lastname: null});
    const [contact, setContact] = useState({email: null, phone: null});
    const [description, setDesc] = useState({desc: null});
    const [serviceArea, setArea] = useState({area: null});
    const [rate, setRate] = useState({rate: null});
    const [serviceType, setServiceType] = useState({serviceType: null});
    const [petType, setPetType] = useState({petType: null});
    const [availDays, setAvailDays] = useState({availDays: null});
    
    useEffect(() => {
        axios
        .post("http://localhost:4000/user/email", {email: userEmail})
        .then((res) => {
//            console.log(res);
            const data = res.data;
            setName({firstname: data.firstname, lastname: data.lastname});
            setContact({email: data.email, phone: data.mobileNumber});
            })
        .catch((err) => {
            console.log(err);
            });
        
        axios
        .post("http://localhost:4000/user/caretaker/find", {caretaker: "testtttt@gmail.com"})
        .then((res) => {
//            console.log(res);
            const data = res.data;
            setDesc({desc: data.description});
            const area = data.city + ", " + data.province + ", " + data.country;
            setArea({area: area});
            setRate({rate: data.rate.$numberDecimal});
            var serviceType = "";
            for (var i = 0; i < data.type.length; i++) {
                var type = "";
                if (data.type[i] == "housesitting") {
                    type = "House Sitting";
                } else if (data.type[i] == "boarding") {
                    type = "Boarding";
                } else {
                    type = "Day Care";
                }
                if (i == data.type.length-1) {
                    serviceType += type;
                } else {
                    serviceType += type + ", ";
                }
            }
            setServiceType({serviceType: serviceType});
            var petType = "";
            for (var i = 0; i < data.pet_type.length; i++) {
                const pet = data.pet_type[i].charAt(0).toUpperCase() + data.pet_type[i].slice(1);
                if (i == data.pet_type.length-1) {
                    petType += pet;
                } else {
                    petType += pet + ", ";
                }
            }
            setPetType({petType: petType});
            var availDays = "";
            for (var i = 0; i < data.available_day.length; i++) {
                const day = data.available_day[i].charAt(0).toUpperCase() + data.available_day[i].slice(1);
                if (i == data.available_day.length-1) {
                    availDays += day;
                } else {
                    availDays += day + ", ";
                }
            }
            setAvailDays({availDays: availDays});
            })
        .catch((err) => {
            console.log(err);
            });
    }, []);

    function createChatRoom(){
        console.log("Hello world");
        axios
        .post("http://localhost:4000/chat/create",{"members":[contact.email,userEmail]});
    }
    
    return (
        <div className="reserve">
            <Header/>
            <div className="reserve_background">
                <div className="reserve_container">
                    <div className="row">
                        <div className="col-3 reserve_img">
                            <img className="reserveimg" src={img} alt={blankImage}/>
                        </div>
                        <div className="col-9 reserve_userinfo">
                            <label className="namelabel">{name.firstname} &nbsp; {name.lastname}</label><br/>
                            <label className="greylabel">{description.desc}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5 reserve_contact">
                            <RoomOutlinedIcon fontSize="large"/>
                            <label className="datalabel">{serviceArea.area}</label><br/>
                            <PhoneRoundedIcon fontSize="large"/>
                            <label className="datalabel">{contact.phone}</label><br/>
                            <MailOutlinedIcon fontSize="large"/>
                            <label className="datalabel">{contact.email}</label>
                        </div>
                        <div className="col-7 reserve_service">
                            <label className="greylabel">Service Type:</label>
                            <label className="datalabel">{serviceType.serviceType}</label><br/>
                            <label className="greylabel">Pet Type:</label>
                            <label className="datalabel">{petType.petType}</label><br/>
                            <label className="greylabel">Available Day(s):</label>
                            <label className="datalabel">{availDays.availDays}</label><br/>
                            <label className="greylabel">Rate per hour (baht):</label>
                            <label className="datalabel">{rate.rate}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 reserve_button">
                            <button className = "RButton" onClick = {() =>createChatRoom()}  >Chat</button>
                            <button className = "RButton" onClick={() => {
              history.push({ pathname: "/reserveform" });
            }}>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReserveCaretaker;