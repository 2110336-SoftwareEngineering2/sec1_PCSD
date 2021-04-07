import React, { useState, useContext, useEffect } from "react";
import { Spinner, Card, Alert } from "react-bootstrap";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import ServiceForm from "./ServiceForm";
import "./MyServices.css";

import history from "../history";
import axios from "axios";

function MyServices() {
  const { user } = useContext(UserContext);
  const [newUser, setNewUser] = useState(null);
  const [info, setInfo] = useState(null);

  const initialInfo = {
    caretaker: user.email,
    type: [],
    rate: "",
    city: "",
    province: "",
    country: "",
    description: "",
    pet_type: [],
    available_day: [],
    reserved: false,
  };

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/caretaker/find", {
        caretaker: user.email,
      })
      .then((res) => {
        console.log(res.data);
        setNewUser(!res.data);
        setInfo(
          res.data
            ? { ...res.data, rate: res.data.rate.$numberDecimal }
            : initialInfo
        );
      })
      .catch((err) => console.log(err));
  }, []);

  function saveInfo() {
    const path = newUser ? "" : "edit/";
    axios
      .post(`http://localhost:4000/user/${path}caretaker`, info)
      .then((res) => {
        console.log(res.data);
        history.push("/services");
        history.go();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    console.log("submitted");
  }

  return (
    <div>
      <Header />
      <div id="service_info" className="p-4">
        {newUser ? (
          <Alert variant="warning">
            Please complete your services information, or the customer will never find you.
          </Alert>
        ) : null}
        <Card>
          <Card.Header className="h2 text-center">
            Service Information
          </Card.Header>
          <Card.Body>
            {info ? (
              <ServiceForm
                input={info}
                updateInput={setInfo}
                submitForm={saveInfo}
              />
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyServices;
