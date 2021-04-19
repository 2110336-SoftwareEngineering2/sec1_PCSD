import React, { useContext, useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { CardDeck, Card } from "react-bootstrap";
import FaceIcon from '@material-ui/icons/Face';
import axios from "axios";
import Header from "../Header/header";
import { UserContext } from "../context/MyContext";
import { AcceptButton, ReceiveButton, CancelButton} from "../component/PaymentButton";
import "./History_Card.css";
import SumPet from "./SumPet";
import Modal from 'react-bootstrap/Modal';
import { ProgressBar } from 'react-bootstrap';
import socketIOClient from "socket.io-client";
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import DateRangeIcon from '@material-ui/icons/DateRange';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import PetsIcon from '@material-ui/icons/Pets';
function History_Card(_) {
  const { user, login } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    payments: [],
    reserves: [],
  })

  const socketRef = useRef();
  const notiEndPoint = "http://localhost:4000";
  
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
            })
        })
        .catch((err) => {
          console.log(err);
          removeCookie("accessToken", {path: "/"});
        });
    } else {
      const header = {"authorization": "Bearer " + cookie.accessToken};
      getReserve(user.email,header);
    }
  }, []);

  useEffect(async () => {
    socketRef.current = socketIOClient(notiEndPoint, {
        query: {
            user: user.email
        }
    });

    return () => {
        socketRef.current.disconnect();
    };
  });


  const getReserve = (email,header) => {
    axios
      .get(`http://localhost:4000/reserve/${email}`, {
      headers: header
    })
      .then((res) => {
        setState({reserves: res.data});
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDate = (sdate,edate) => {
    console.log(new Date(sdate).toLocaleDateString());
    console.log(new Date(sdate).toLocaleTimeString());
    return (  <div className="date"> <DateRangeIcon />&nbsp;Date&nbsp;
      <p style={{color: "#9D7F70" , marginLeft:"30px"}}>&nbsp;{new Date(sdate).toLocaleDateString()}, {new Date(sdate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}  - {new Date(edate).toLocaleDateString()}, {new Date(edate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </p>
      </div>
    );
  };
 const getStatus = (status, role) => {
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
    axios
      .delete(`http://localhost:4000/reserve/delete/${id}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        _id: id,
      })
      .then((res) => {
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
    <div className="History_Card">
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

export default History_Card;
