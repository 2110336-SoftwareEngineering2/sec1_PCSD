import React from "react";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import "./LoginPage.css";
import mainLogo from "../petidcare.png";

function LoginPage() {
  const logo = (
    <Col sm>
      <img src={mainLogo} />
      <p>online matching platform for caretakers and pet owners</p>
    </Col>
  );
  const tabs = (
    <Col sm>
      <Tabs defaultActiveKey="login">
        <Tab eventKey="login" title="Login">
          <LoginForm />
        </Tab>
        <Tab eventKey="profile" title="Register">
          <RegistrationForm />
        </Tab>
      </Tabs>
    </Col>
  );
  return (
    <Container id="main-login-page">
      <Row className="mx-5">
        {logo}
        {tabs}
      </Row>
    </Container>
  );
}

export default LoginPage;
