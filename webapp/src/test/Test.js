import React, { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { CardDeck, Card, Button } from "react-bootstrap";
import axios from "axios";

import { UserContext } from "../context/MyContext";
import { AcceptButton, ReceiveButton, CancelButton} from "../component/PaymentButton";
import "./Test.css";
import Test2 from "./Test2";

function Test(_) {
  const { user, login } = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    payments: []
  })

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
              getPayment(header);
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

  const getPayment = (header) => {
    axios
      .get("http://localhost:4000/user/payment", {
        headers: header
      })
      .then((res) => {
        setState({payments: res.data});
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getButton = (payment, index) => {
    if (user.role === "caretaker") {
      if (payment.transferStatus === "WAITING") {
        return (
          <div>
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
          <ReceiveButton
              payment={payment}
              accessToken={cookie.accessToken}
              setState={setState}
              state={state}
              index={index}
              />
        )
      }
    } else {
      if (payment.transferStatus === "WAITING") {
        return (
          <CancelButton
            payment={payment}
            accessToken={cookie.accessToken}
            setState={setState}
            state={state}
            index={index}
          />
        );
      }
    }
  };

  return (
    <div className="test">
      {loading ? (
        <h1> Loading... </h1>
      ) : (
          <div className="Cardd">
        <CardDeck>
        {state.payments.map((payment, index) => (
          <Card style={{ width: '18rem' }} key={payment._id}>
            <Card.Body>
            { user.role == "caretaker" ? <Card.Title>Job</Card.Title> :  <Card.Title>Payment</Card.Title>
            }
            {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
            <Card.Text>
              <p>petowner's email: {payment.petownerEmail}</p>
              <p>caretaker's email: {payment.caretakerEmail}</p>
              <p>amount: {payment.amount.$numberDecimal}</p>
              <p>
                status: <span className={payment.transferStatus}>{(user.role === "petowner") && (payment.transferStatus === "ACCEPTED") ? "ควยไอสัสเรื่องมากชิบหายเลยนะมึงอะ" : payment.transferStatus}</span>
              </p>
            </Card.Text>
            { getButton(payment, index) }
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
