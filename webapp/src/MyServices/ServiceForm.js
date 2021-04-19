import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

import Input from "./FormComponents";

function ServiceForm({ input, updateInput, submitForm }) {
  const [submitted, setSubmitted] = useState(false);
  const [modified, setModified] = useState(false);

  function modifiedInput({ target: { name, value } }) {
    if (["type", "pet_type", "available_day"].includes(name)) {
      const vals = input[name].includes(value)
        ? input[name].filter((e) => {
            return e !== value;
          })
        : [...input[name], value];
      updateInput({ ...input, [name]: vals });
    } else updateInput({ ...input, [name]: value });
    setModified(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setSubmitted(true);
      submitForm();
    }
  }

  return (
    <Form validated={modified} onSubmit={handleSubmit}>
      <fieldset disabled={submitted}>
        <Form.Row>
          <Col sm="12" md="4" lg="3" style={{ minWidth: "150px" }}>
            <Input.ServiceType input={input} onChange={modifiedInput} />
            <Input.ServiceRate input={input} onChange={modifiedInput} />
          </Col>
          <Col sm="12" md="8" lg="5" style={{ minWidth: "150px" }}>
            <Input.ServiceArea input={input} onChange={modifiedInput} />
          </Col>
          <Col sm="12" md="12" lg="4" style={{ minWidth: "150px" }}>
            <Input.Description input={input} onChange={modifiedInput} />
          </Col>
        </Form.Row>
        <Form.Row>
          <Col sm="6" md="4">
            <Input.PetType input={input} onChange={modifiedInput} />
          </Col>
          <Col sm="6" md="8">
            <Input.AvailableDay input={input} onChange={modifiedInput} />
          </Col>
        </Form.Row>
        <Input.Submit modified={modified} submitted={submitted} />
      </fieldset>
    </Form>
  );
}

export default ServiceForm;
