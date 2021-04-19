import React, { useState } from "react";
import { Container, Card, Form } from "react-bootstrap";

import Input from "./FormComponents";

function ProfileForm({ input, updateInput, valid, submitForm, submitted }) {
  const [modified, setModified] = useState(false);

  function modifyInput({ target: { name, value } }) {
    updateInput(name, value);
    setModified(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) submitForm();
  }

  return (
    <Container className="my-card">
      <Card className="mx-auto" style={{ width: "100%" }}>
        <Card.Header className="h4">Edit Your Profile</Card.Header>
        <Card.Body>
          <Form validated={modified} onSubmit={handleSubmit}>
            <fieldset disabled={submitted}>
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
                  valid={valid}
                />
              </Form.Row>
              <Form.Row>
                <Input.MobileNumber input={input} onChange={modifyInput} />
                <Input.Gender input={input} onChange={modifyInput} />
              </Form.Row>
              <Input.Submit
                modified={modified || input.userImg}
                submitted={submitted}
              />
            </fieldset>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default ProfileForm;
