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
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function ReserveCaretaker(props) {
    const { user } = useContext(UserContext);
    const userEmail = user.email;
    const caretaker = props.location.state.caretaker;
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
    const [show, setShow] = useState(false);
    const [reviews, setReview] = useState([]);

    useEffect(() => {
        axios
        .post("http://localhost:4000/user/getrateAndcomment", {caretaker: caretaker})
        .then((res) => {
            const data = res.data;
            setReview(data.raw_rate);
            })
        .catch((err) => {
            console.log(err);
            });

        axios
        .post("http://localhost:4000/user/email", {email: caretaker})
        .then((res) => {
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
            });
    }, []);

    function createChatRoom () {
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
    }

    const saveToCookies = () => {
        const data = {
            caretaker: caretaker,
            petowner: userContext.user.email,
            rate: rate.rate,
            petType: petType,
            serviceType: serviceType,
            availDays: availDays
        }
        setCookie("reserveTmp", data, { path: "/" });
    }

    function onclick() {
        createChatRoom() 
    }

    const [ratingVal, setRatingVal] = useState(0);
    const [commentVal, setCommentVal] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        const sentReview = {caretaker: caretaker, rate: ratingVal, comment: commentVal};
            
        axios
        .post("http://localhost:4000/user/rateAndcomment", sentReview)
        .then((res) => {
        })
        .catch((err) => {
            console.log(err.response.data);
        });

        window.alert("Review sent!");
        window.location.reload();
    }

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
                                 if (user.role == "caretaker") setShow(true);
                                 else {
                                 setShow(false);
                                    if (!clickReview.clicked) {
                                        setClickReview({clicked: true});
                                    } else {
                                        setClickReview({clicked: false});
                                    }
                                }
                                }}>Review</button>
                            <button className="RButton" onClick={() => {
                                if (user.role == "caretaker") setShow(true);
                                else {
                                setShow(false);
                                saveToCookies();
                                axios.post("http://localhost:4000/user/caretaker/find", {caretaker: caretaker})
                                .then((res) => {
                                  history.push( {pathname: "/reserveform", state: res.data});
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                                }
                                }}>Reserve</button>
                        </div>
                    </div>
                    <div className="alert">
                        <Alert show={show} variant="danger">
                            <Alert.Heading>Wait!!! You're not a Petowner!</Alert.Heading>
                            <p>
                            You don't have a permission to do this action. Please sign in as a Petowner.
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                            <Button onClick={() => setShow(false)} variant="outline-danger">
                                Close
                            </Button>
                            </div>
                        </Alert>
                    </div>
                    {!clickReview.clicked ? null : 
                    <div className="row">
                        <div className="col--6">
                            <div className="show-comment">
                                {reviews.length == 0 ? 
                                    <div className="no-review-box">
                                        <label className="no-review">No reviews</label>
                                    </div> : 
                                    reviews.map((review) => <ReserveComment key={review._id} review={review}/>)}
                            </div>
                        </div>
                        <div className="col--6">
                            <div className="row">
                                <div className="col--12 rating_section">
                                    <Rating name="controlled-rating" value={ratingVal} precision={0.5} size="large" onChange={(event, newVal) => {
                                        setRatingVal(newVal);
                                    }}/>
                                </div>
                            </div>
                            <div className="row">
                                <form className="col--12 comment_section" onSubmit={onSubmit}>
                                    <textarea required placeholder="Comments..." value={commentVal} onChange={(event) => {
                                        setCommentVal(event.target.value);
                                    }}/><br/>
                                    <button className="RButton" type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ReserveCaretaker;