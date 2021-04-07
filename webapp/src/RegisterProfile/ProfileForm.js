import React, { useState, useEffect } from "react";
import { Container, Card, Form, Alert } from "react-bootstrap";

import Input from "./FormComponents";

function ProfileForm({ input, updateInput, valid, submitForm, submitted }) {
  console.log(input);

  function modifyInput({ target: { name, value } }) {
    updateInput(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) submitForm();
  }

  return (
    <Container className="my-card">
      <Card className="mx-auto" style={{ width: "100%" }}>
        <Card.Header className="h4">Registration Form</Card.Header>
        <Card.Body>
          <Form validated onSubmit={handleSubmit}>
            <fieldset disabled={submitted}>
              <Form.Row>
                <Input.FirstName input={input} onChange={modifyInput} />
                <Input.LastName input={input} onChange={modifyInput} />
              </Form.Row>
              <Form.Row>
                <Input.Password input={input} onChange={modifyInput} />
                <Input.ConfirmPassword input={input} onChange={modifyInput} />
              </Form.Row>
              <Form.Row>
                <Input.Email
                  input={input}
                  onChange={modifyInput}
                  valid={valid.email}
                />
                <Input.Username
                  input={input}
                  onChange={modifyInput}
                  valid={valid.username}
                />
              </Form.Row>
              <Form.Row>
                <Input.MobileNumber input={input} onChange={modifyInput} />
                <Input.Gender input={input} onChange={modifyInput} />
              </Form.Row>
              <Input.Submit submitted={submitted} />
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default ProfileForm;
