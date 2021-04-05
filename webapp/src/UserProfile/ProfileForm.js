import React, { useState, useEffect } from "react";
import { Container, Card, Form, Alert } from "react-bootstrap";

import Input from "./FormComponents";

function ProfileForm({ input, updateInput, submitForm, invalidUsername }) {
  const [modified, setModified] = useState(false);
  const [showAlert, setShowAlert] = useState(!!invalidUsername);

  useEffect(() => {
    setShowAlert(!!invalidUsername);
  }, [invalidUsername]);

  function modifyInput({ target: { name, value } }) {
    updateInput({ ...input, [name]: value });
    setModified(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) submitForm();
  }

  return (
    <Container className="my-card">
      {showAlert ? (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Username '<b className="blockquote">{invalidUsername}</b> ' is
          unavailable!
        </Alert>
      ) : null}
      <Card className="mx-auto" style={{ width: "100%" }}>
        <Card.Header className="h4">Edit Your Profile</Card.Header>
        <Card.Body>
          <Form validated={modified} onSubmit={handleSubmit}>
            <Form.Row>
              <Input.FirstName input={input} onChange={modifyInput} />
              <Input.LastName input={input} onChange={modifyInput} />
            </Form.Row>
            <Form.Row>
              <Input.NewPassword input={input} onChange={modifyInput} />
              <Input.ConfirmPassword input={input} onChange={modifyInput} />
            </Form.Row>
            <Form.Row>
              <Input.Email input={input} onChange={modifyInput} />
              <Input.Username
                input={input}
                onChange={modifyInput}
                valid={input.username !== invalidUsername}
              />
            </Form.Row>
            <Form.Row>
              <Input.MobileNumber input={input} onChange={modifyInput} />
              <Input.Gender input={input} onChange={modifyInput} />
            </Form.Row>
            <Input.Submit modified={modified || input.userImg} />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default ProfileForm;
