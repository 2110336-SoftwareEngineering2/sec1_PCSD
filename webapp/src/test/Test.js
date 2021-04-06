import React, { useContext, useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { CardDeck, Card, Button } from "react-bootstrap";
import FaceIcon from '@material-ui/icons/Face';
import axios from "axios";
import Header from "./../Header/header";
import { UserContext } from "../context/MyContext";
import { AcceptButton, ReceiveButton, CancelButton} from "../component/PaymentButton";
import "./Test.css";
import SumPet from "./SumPet";
import Modal from 'react-bootstrap/Modal';
import { ProgressBar } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import moment from "moment";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PetsIcon from '@material-ui/icons/Pets';
function Test(_) {
  const { user, login } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    payments: [],
    reserves: [],
  })

  const socketRef = useRef();
  const notiEndPoint = "http://localhost:5000";
  const data = useState([]);
  
  useEffect(() => {
    if (!user && cookie.accessToken !== undefined) {
      const header = {"authorization": "Bearer " + cookie.accessToken};
      axios
        .post("http://localhost:4000/auth/valid", {}, {
          headers: header
        })
        .then((res) => {
          axios
            .post("http://localhost:4000/user/email", {email: (res.data).email})
            .then((res) => {
              login({...res.data, accessToken: cookie.accessToken});
              getReserve((res.data).email);
              console.log(state.reserves)
            })
        })
        .catch((err) => {
          console.log(err);
          removeCookie("accessToken", {path: "/"});
        });
    } else {
      const header = {"authorization": "Bearer " + cookie.accessToken};
      //getPayment(header);
      getReserve(user.email,header);
    }
  }, []);

  useEffect(async () => {
    // console.log(reserveData)
    socketRef.current = socketIOClient(notiEndPoint, {
        query: {
            user: user.email
        }
    });

    return () => {
        socketRef.current.disconnect();
    };
  });

  const getPaymentById = (id) => {
    var x = axios.get(`http://localhost:4000/user/payment/${id}`, {headers: {authorization: cookie.accessToken}})
    .then(res => {
      return res;
    })
    return x;
  }

  const getPayment = (header) => {
    axios
      .get("http://localhost:4000/user/payment", {
        headers: header
      })
      .then((res) => {
        setState({payments: res.data});
        console.log("s",res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReserve = (email,header) => {
    axios
      .get(`http://localhost:4000/reserve/${email}`, {
      headers: header
    })
      .then((res) => {
        setState({reserves: res.data});
        console.log("ssssss",res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDate = (sdate,edate) => {
    // DateRangeIcon
    console.log(new Date(sdate).toLocaleDateString());
    console.log(new Date(sdate).toLocaleTimeString());
    return (  <div className="date"> <DateRangeIcon />&nbsp;Date&nbsp;
      <p style={{color: "#9D7F70" , marginLeft:"30px"}}>&nbsp;{new Date(sdate).toLocaleDateString()}, {new Date(sdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}  - {new Date(edate).toLocaleDateString()}, {new Date(edate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </p>

      </div>
    );
  };
 const getStatus = (status, role) => {
   const text = "";
    switch(status) {
      case "CANCELLED" : 
        return  <ProgressBar striped variant="danger" now={100} label={`CANCELLED`}/>;
      case "DONE" : 
      return  <ProgressBar striped variant="success" now={100} label={`DONE`}/>;
      case "ACCEPTED" :
        if(role === "petowner")
        return  <ProgressBar animated variant="info" now={60} label={`PAID`}/>;
        else return  <ProgressBar animated variant="info" now={60} label={`WORKING`}/>;
      case "WAITING":
        return <ProgressBar animated variant="warning" now={30} label={`WAITING`}/> ;
    }
 }
  const getPet = (pet_lists) => {
    return (
      <div>
      <div className="pett"><PetsIcon />&nbsp;&nbsp;<p>Pets:</p>&nbsp; </div>
    <SumPet pet_lists={pet_lists}/>
    </div>
    );
  };
  const deleteCard = (id) => {
    console.log("sds",id); 
    axios
      .delete(`http://localhost:4000/reserve/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        _id: id,
      })
      .then((res) => {
        console.log(res.data);
        setState({reserves: state.reserves.filter((card) => card._id !== id)});
      })
      .catch((err) => console.log(err));
  }
  const getPName = (info) => {
   return (
    <div className="Pname"><FaceIcon /> &nbsp;Petowner's name&nbsp; <p style={{color: "#BD6A43", marginLeft: "70px"}}> {info.petownerFname} {info.petownerLname}</p></div>
   );
  }
  const getCName = (info) => {
    return (
      <div className="Cname"><FaceIcon /> &nbsp;Caretaker's name&nbsp; <p style={{color: "#BD6A43", marginLeft:"70px"}}> {info.caretakerFname} {info.caretakerLname}</p> </div>
    );
   }
   const getService = (info) => {
    return (
      <div className="Service"><WorkOutlineIcon />&nbsp;Service type&nbsp; <p style={{color: "#9D7F70", marginLeft:"105px"}}>{info.service}</p> </div>
    );
   }
   const getAmount = (info) => {
    return (
      <div className="Amount"><MonetizationOnOutlinedIcon />&nbsp;Amount&nbsp; <p style={{color: "#9D7F70", marginLeft:"130px"}}>{info}</p> </div>
    );
   }
  const getButton = (payment, index) => {
    if (user.role === "caretaker") {
      if (payment.transferStatus === "WAITING") {
        return (
          <div className="row watingbutton">
            <div className="col-6">
            <AcceptButton
              payment={payment}
              accessToken={cookie.accessToken}
              setState={setState}
              state={state}
              index={index}
              socket={socketRef.current}
            /> </div>
             <div className="col-6">
            <CancelButton
              payment={payment}
              accessToken={cookie.accessToken}
              setState={setState}
              state={state}
              index={index}
              socket={socketRef.current}
              />
              </div>
          </div>
        );
      } else if(payment.transferStatus === "ACCEPTED") {
        return(
          <div className="acceptedbutton">
          <ReceiveButton
              payment={payment}
              accessToken={cookie.accessToken}
              setState={setState}
              state={state}
              index={index}
              socket={socketRef.current}
              />
          </div>
        )
      }
    } else {
      if (payment.transferStatus === "WAITING") {
        return ( 
        <div className="watingcanbutton"> 
          <CancelButton
            payment={payment}
            accessToken={cookie.accessToken}
            setState={setState}
            state={state}
            index={index}
            socket={socketRef.current}
          />
        </div>
        );
      }
    }
  };
  

  return (
    <div className="test">
      <Header />
      <h1>{ user.role == "caretaker" ? "Job " :  "Payment "
            } &nbsp;Histories</h1>
      {loading ? (
        <h1> Loading... </h1>
      ) : (
          <div className="Cardd">
             
        <CardDeck>
        {state.reserves.map((reserve, index) => (
          <Card style={{ width: '400px' }} key={reserve.payment._id}>
              <div className="cardtitle" id="cardtitle">
                <Modal.Header>
            { user.role == "caretaker" ? <Modal.Title>Job</Modal.Title> :  <Modal.Title>Payment</Modal.Title>
            }
          <Modal.Title id="delete" onClick={() => deleteCard(reserve._id)}>X</Modal.Title>
            </Modal.Header>
            </div>
            <Card.Body>
            <Card.Text>
              {getPName(reserve.payment)}
              <hr></hr>
              {getCName(reserve.payment)}
              <hr></hr>
              {getService(reserve)}
              <hr></hr>
             {getDate(reserve.startDate, reserve.endDate)}
              <hr></hr>
              {getAmount(reserve.payment.amount.$numberDecimal)}
              <hr></hr>
              { getPet(reserve.pets)}
              <div className="cardstatus">
              <div className="power">
                {getStatus(reserve.payment.transferStatus, user.role)}
              </div>
              { getButton(reserve.payment, index) } </div>
            </Card.Text>

          </Card.Body>
          </Card>
        ))}
      </CardDeck>
      </div>
      )}
    </div>
  );
}

export default Test;
