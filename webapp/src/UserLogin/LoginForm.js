import React, { useState, useContext } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

import { UserContext } from "../context/MyContext";
import history from "../history";
import axios from "axios";

function LoginForm() {
  const { login } = useContext(UserContext);

  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [info, setInfo] = useState({ email: "", password: "" });

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    axios
      .post("http://localhost:4000/auth/login", info)
      .then((res) => {
        login(res.data);
        history.push({ pathname: "/" });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
        setSubmitted(false);
      });
  }

  function onChange({ target: { name, value } }) {
    setInfo({ ...info, [name]: value });
  }

  return (
    <Form onSubmit={handleSubmit} style={{ width: "320px" }}>
      <fieldset disabled={submitted}>
        <Form.Control
          type="email"
          id="login-email"
          name="email"
          placeholder="Email Address"
          onChange={onChange}
        />
        <Form.Control
          type="password"
          id="login-password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <Button type="submit">
          {submitted ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : null}
          {submitted ? " Loading..." : "Login"}
        </Button>
        {errorMessage ? <Alert variant="danger">{errorMessage}</Alert> : null}
      </fieldset>
    </Form>
  );
}

export default LoginForm;
