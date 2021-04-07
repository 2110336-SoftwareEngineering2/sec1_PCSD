import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./LoginPage.css";
import mainLogo from "../petidcare.png";

function LoginPage() {
  return (
    <Container id="main-login-page">
      <Row className="mx-5">
        <Col>
          <img src={mainLogo} />
          <p>online matching platform for caretakers and pet owners</p>
        </Col>
        <Col>Hi</Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
