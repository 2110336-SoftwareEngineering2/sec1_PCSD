import React, { useState, useEffect, useContext } from "react";
import "./ReserveCaretaker.css";
import history from "./history";
import blankImage from "./userpic.png";
import Header from "./Header/header";
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserContext } from "./context/MyContext";
import Rating from '@material-ui/lab/Rating';
import ReserveComment from "./ReserveComment"

function ReserveCaretaker(props) {
    const { user } = useContext(UserContext);
    const userEmail = user.email;
    // console.log(userEmail);
    const caretaker = props.location.state.caretaker;
    // console.log(caretaker);
    const img = "https://pcsdimage.s3-us-west-1.amazonaws.com/"+ caretaker;
    const [name, setName] = useState({firstname: null, lastname: null});
    const [contact, setContact] = useState({email: null, phone: null});
    const [description, setDesc] = useState({desc: null});
    const [serviceArea, setArea] = useState({area: null});
    const [rate, setRate] = useState({rate: null});
    const [serviceType, setServiceType] = useState({serviceType: null});
    const [petType, setPetType] = useState({petType: null});
    const [availDays, setAvailDays] = useState({availDays: null});
    const [cookie, setCookie, removeCookie] = useCookies();
    const userContext = useContext(UserContext);
    const [clickReview, setClickReview] = useState({clicked: false});
    const [rating, setRating] = useState({rating: 0, count: 0});
    const endPoint = "http://localhost:4000";
    
    useEffect(() => {
        // axios
        // .get("http://localhost:4000/user/comment/caretaker", {caretaker: caretaker})
        // .then((res) => {
        //     console.log(res);
        //     })
        // .catch((err) => {
        //     console.log(err);
        //     });

        axios
        .post("http://localhost:4000/user/email", {email: caretaker})
        .then((res) => {
            // console.log(res);
            const data = res.data;
            setName({firstname: data.firstname, lastname: data.lastname});
            setContact({email: data.email, phone: data.mobileNumber});
            })
        .catch((err) => {
            console.log(err);
            });
        
        axios
        .post("http://localhost:4000/user/caretaker/find", {caretaker: caretaker})
        .then((res) => {
            console.log(res);
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
            const rating = data.rate_point.sum_rate.$numberDecimal / data.rate_point.rate_count;
            setRating({rating: rating, count: data.rate_point.rate_count});
            })
        .catch((err) => {
            console.log(err);
            console.log("what");
            });
    }, []);

    function createChatRoom () {
        //console.log("Hello world");
        axios.get(`${endPoint}/chat/rooms/?members=${userEmail}&members=${caretaker}`, {
            headers: {
                authorization: "Bearer " + cookie.accessToken
            }
        }).then((res) => {
            setCookie("chatroomTmp", (res.data)._id, {path: "/"});
            history.push({pathname: "/chat"})
        }).catch(err => {
            console.log(err)
            axios.post(`${endPoint}/chat/create`, {"members": [contact.email, userEmail]}, {
                headers: {
                    authorization: "Bearer " + cookie.accessToken
                }
            })
            .then((newChatroom) => {
                setCookie("chatroomTmp", (newChatroom.data)._id, {path: "/"});
                history.push({pathname: "/chat"});
            })
            .catch((newErr) => console.log(newErr))
        })
        // axios.post("http://localhost:4000/chat/create",{"members":[contact.email,userEmail]},{
        //     headers: {
        //         "authorization": "Bearer " + cookie.accessToken
        //     }
        // });
    }

    const saveToCookies = () => {
        const data = {
            caretaker: caretaker,
            petowner: userContext.user.email,
            // petowner: petowner,
            rate: rate.rate,
            petType: petType,
            serviceType: serviceType,
            availDays: availDays
        }
        setCookie("reserveTmp", data, { path: "/" });
        // console.log(cookie.ReserveTmp)
    }

    function onclick() {
        createChatRoom() 
        // history.push( {pathname: "/chat"});
    }

    const [ratingVal, setRatingVal] = useState(0);
    const [commentVal, setCommentVal] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        if (ratingVal == 0 && commentVal == "") {
            window.alert("Please review before submitting!");
        } else {
            const sentRating = {caretaker: caretaker, rater: userEmail, rate: ratingVal};
            const sentComment = {email: caretaker, comment: commentVal};
            // console.log(sentRating);
            // console.log(sentComment);
            
            axios
            .post("http://localhost:4000/user/caretaker/rate", sentRating)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });

            axios
            .post("http://localhost:4000/user/comment/caretaker", sentComment)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });

            window.alert("Review sent!");
            window.location.reload();
        }
    }
    
    const test = [1,2,3,4,5];

    return (
        <div className="reserve">
            <Header/>
            <div className="reserve_background">
                <div className="reserve_container">
                    <div className="row">
                        <div className="col--3 reserve_img">
                            <img className="reserveimg" src={img} alt={blankImage}/>
                        </div>
                        <div className="col--9 reserve_userinfo">
                            <label className="namelabel">{name.firstname} &nbsp; {name.lastname}</label>
                            <div className="show-rating">
                                <Rating value={rating.rating} precision={0.5} size="large" readOnly/>
                                <label className="rating_label">({rating.count})</label>
                            </div><br/>
                            <label className="greylabel">{description.desc}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col--5 reserve_contact">
                            <RoomOutlinedIcon fontSize="large"/>
                            <label className="datalabel">{serviceArea.area}</label><br/>
                            <PhoneRoundedIcon fontSize="large"/>
                            <label className="datalabel">{contact.phone}</label><br/>
                            <MailOutlinedIcon fontSize="large"/>
                            <label className="datalabel">{contact.email}</label>
                        </div>
                        <div className="col--7 reserve_service">
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
                        <div className="col--12 reserve_button">
                            <button className="RButton" onClick = {() => onclick()}  >Chat</button>
                            <button className="RButton" onClick = {() => {
                                    if (!clickReview.clicked) {
                                        setClickReview({clicked: true});
                                    } else {
                                        setClickReview({clicked: false});
                                    }
                                }}>Review</button>
                            <button className="RButton" onClick={() => {
                                saveToCookies();
                                axios.post("http://localhost:4000/user/caretaker/find", {caretaker: caretaker})
                                .then((res) => {
                                  history.push( {pathname: "/reserveform", state: res.data});
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                                }}>Reserve</button>
                        </div>
                    </div>
                    {!clickReview.clicked ? null : 
                    <div className="row">
                        <div className="col--6">
                            {test.map((num) => <ReserveComment val={num}/>)}
                        </div>
                        <div className="col--6">
                            <form onSubmit={onSubmit}>
                                <div className="row">
                                    <div className="col--12 rating_section">
                                        <Rating name="controlled-rating" value={ratingVal} size="large" onChange={(event, newVal) => {
                                            setRatingVal(newVal);
                                        }}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col--12 comment_section">
                                        <textarea placeholder="Comments..." value={commentVal} onChange={(event) => {
                                            setCommentVal(event.target.value);
                                        }}/><br/>
                                        <button className="RButton" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ReserveCaretaker;