import React, { useState, useContext, useEffect } from "react";
import { Spinner, Card } from "react-bootstrap";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import ServiceForm from "./ServiceForm";
import "./MyServices.css";

import history from "../history";
import axios from "axios";

function MyServices() {
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:4000/user/caretaker/find", {
        caretaker: user.email,
      })
      .then((res) => {
        setInfo({ ...res.data, rate: res.data.rate.$numberDecimal });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Header />
      <div id="service_info" className="p-4">
        <Card>
          <Card.Header className="h2 text-center">
            Service Information
          </Card.Header>
          <Card.Body>
            {info ? (
              <ServiceForm input={info} updateInput={setInfo} />
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
