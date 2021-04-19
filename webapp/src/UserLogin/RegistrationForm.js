import React, { useState, useContext } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";

import { RegisterContext } from "../context/MyContext";
import history from "../history";

function RegistrationForm({}) {
  const { setData } = useContext(RegisterContext);
  const [submitted, setSubmitted] = useState(false);
  const [info, setInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: null,
    role: null,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setData(info);
    history.push({ pathname: "/user_register" });
  }

  function onChange({ target: { name, value } }) {
    setInfo({ ...info, [name]: value });
  }

  const text = (type, id, placeholder) => {
    return (
      <Text_
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  };

  const role = (id, label) => {
    return <Choice_ name="role" id={id} label={label} onChange={onChange} />;
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "320px" }}>
      <fieldset disabled={submitted}>
        {text("text", "firstname", "First Name")}
        {text("text", "lastname", "Last Name")}
        {text("tel", "mobileNumber", "Mobile Number (e.g. 0991234567)")}
        {text("email", "email", "Email Address")}
        {text("password", "password", "New Password")}

        <Form.Group as={Col}>
          <Form.Label>Register As</Form.Label>
          <Col className="p-0 m-0">
            {role("petowner", "Pet Owner")}
            {role("caretaker", "Caretaker")}
          </Col>
        </Form.Group>

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
          {submitted ? " Loading..." : "Next"}
        </Button>
      </fieldset>
    </Form>
  );
}

export default RegistrationForm;

function Text_({ type, id, placeholder, onChange }) {
  return (
    <Form.Control
      type={type}
      id={id}
      name={id}
      placeholder={placeholder}
      onChange={onChange}
      autoComplete={type === "password" && "new-password"}
      pattern={type === "tel" && "[0-9]{10}"}
    />
  );
}

function Choice_({ name, id, label, onChange }) {
  return (
    <Form.Check
      type="radio"
      name={name}
      id={id}
      value={id}
      label={label}
      onChange={onChange}
      inline
      required
    />
  );
}
