import React, { useState, useContext, useEffect } from "react";
import { Spinner, Card } from "react-bootstrap";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import ServiceForm from "./ServiceForm";
import "./MyServices.css";

import history from "../history";
import axios from "axios";

function MyServices(props) {
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState(null);
  console.log(props);

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

  function saveInfo() {
    axios
      .post("http://localhost:4000/user/edit/caretaker", info)
      .then((res) => {
        console.log(res.data);
        history.push("/services");
        history.go();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    console.log("summitted");
  }

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
