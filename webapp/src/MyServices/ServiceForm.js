import React from "react";
import { Form, Col } from "react-bootstrap";

import Input from "./FormComponents";

function ServiceForm({ input, updateInput }) {
  console.log(input);
  return (
    <Form>
      <Form.Row>
        <Col>
          <Input.ServiceType input={input} onChange={updateInput} />
          <Input.ServiceRate input={input} onChange={updateInput} />
        </Col>
        <Col>
          <Form.Row></Form.Row>
          <Form.Row></Form.Row>
          <Form.Row></Form.Row>
        </Col>
        <Col></Col>
      </Form.Row>
      <Form.Row>
        <Col></Col>
      </Form.Row>
    </Form>
  );
}

export default ServiceForm;
