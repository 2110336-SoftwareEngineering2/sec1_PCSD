import React, { useState, useContext } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { UserContext } from "../context/MyContext";

import {
  InputName,
  InputPassword,
  InputEmail,
  InputDetail,
} from "./FormComponents";

function EditForm() {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState(user);

  function handleChange(event) {
    const name = event.target.name;
    setInput({ ...input, [name]: event.target.value });
  }
  function handleSubmit(event) {
    event.preventDefault();
  }

  console.log(input);

  return (
    <Container className="my-card">
      <Card className="mx-auto" style={{ width: "100%" }}>
        <Card.Header className="h4">Edit Your Profile</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <InputName input={input} onChange={handleChange} />
            <InputPassword input={input} onChange={handleChange} />
            <InputEmail input={input} onChange={handleChange} />
            <InputDetail input={input} onChange={handleChange} />
            <div className="text-right mx-lg-3">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default EditForm;
