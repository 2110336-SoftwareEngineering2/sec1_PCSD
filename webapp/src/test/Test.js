import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CardDeck, Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "./../Header/header";
import { UserContext } from "../context/MyContext";
import { AcceptButton, ReceiveButton, CancelButton} from "../component/PaymentButton";
import "./Test.css";
import Test2 from "./Test2";
import SumPet from "./SumPet";
import Modal from 'react-bootstrap/Modal';

function Test(_) {
  const { user, login } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    payments: [],
    reserves: []
  })
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
              // getPayment(header);
              getReserve((res.data).email);
              console.log(state.reserves)
              var x = [];
              for (var i =0; i<(state.reserves).length; i++) {
                var reserve = (state.reserves)[i];
                var id = reserve.paymentId;
                console.log(id)
                var payment = getPaymentById(id);
                console.log(payment)
                x.push({...reserve, payment});
              }
              console.log(x)
            })
        })
        .catch((err) => {
          console.log(err);
          removeCookie("accessToken", {path: "/"});
        });
    } else {
      const header = {"authorization": "Bearer " + cookie.accessToken};
      getPayment(header);
    }
  }, []);

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
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getReserve = (email) => {
    axios
      .get(`http://localhost:4000/reserve/${email}`, {
      headers: {
        "authorization": "Bearer " + cookie.accessToken
    }
    })
      .then((res) => {
        setState({reserves: res.data});
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
/*
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
*/
 
  const getPet = (email) => {
    const pet_lists = null;
    axios
    .get(`http://localhost:4000/reserve/${email}`, {
      headers: {
        "authorization": "Bearer " + cookie.accessToken
    }
    })
    .then((res) => {
      console.log(res.data.pets);
      return (
        <SumPet pet_lists= {res.data.pets}/>
      );
    })
    .catch((err) => {
      console.log("pet", err);
    });
     
  };
  const getButton = (payment, index) => {
    if (user.role === "caretaker") {
      if (payment.transferStatus === "WAITING") {
        return (
          <div className="watingbutton">
            <AcceptButton
              payment={payment}
              accessToken={cookie.accessToken}
              setState={setState}
              state={state}
              index={index}
            />
            <CancelButton
              payment={payment}
              accessToken={cookie.accessToken}
              setState={setState}
              state={state}
              index={index}
              />
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
          />
        </div>
        );
      }
    }
  };
  return (
    <div className="test">
      <Header />
      {loading ? (
        <h1> Loading... </h1>
      ) : (
          <div className="Cardd">
             
        <CardDeck>
        {state.payments.map((payment, index) => (
          <Card style={{ width: '400px' }} key={payment._id}>
            
              <div className="cardtitle">
                <Modal.Header closeButton>
            { user.role == "caretaker" ? <Modal.Title>Job</Modal.Title> :  <Modal.Title>Payment</Modal.Title>
            }
            </Modal.Header>
            </div>
            <Card.Body>
            <Card.Text>
              <p>Petowner's name: {payment.petownerFname} {payment.petownerLname}</p>
              <p>Caretaker's name: {payment.caretakerFname} {payment.caretakerLname}</p>
              <p>amount: {payment.amount.$numberDecimal}</p>
              {/*getPet(payment.caretakerEmail)*/}
              <div className="row cardstatus">
              <p>
                status: <span className={payment.transferStatus}>{(user.role === "petowner") && (payment.transferStatus === "ACCEPTED") ? "PAID" : payment.transferStatus}</span>
              </p>
              { getButton(payment, index) } </div>
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
