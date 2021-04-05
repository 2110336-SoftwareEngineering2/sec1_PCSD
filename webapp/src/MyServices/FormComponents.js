import React from "react";
import { Form, Col, InputGroup } from "react-bootstrap";

function ServiceType({ input, onChange }) {
  function Type({ type, label }) {
    return (
      <Form.Check
        type="checkbox"
        name="type"
        id={type}
        value={type}
        label={label}
        checked={input.type.includes(type)}
      />
    );
  }
  return (
    <Form.Group className="px-2 mx-lg-3">
      <Form.Label>Service Type</Form.Label>
      <Col className="border rounded">
        <Type type="housesitting" label="House Sitting" />
        <Type type="boarding" label="Boarding" />
        <Type type="daycare" label="Day Care" />
      </Col>
    </Form.Group>
  );
}

function ServiceRate({ input, onChange }) {
  return (
    <Form.Group className="px-2 mx-lg-3">
      <Form.Label>
        Service Rate <sub className="text-danger">(per hour)</sub>
      </Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>฿</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          type="number"
          name="rate"
          placeholder="0"
          min="0"
          defaultValue={input.rate}
          onChange={onChange}
          required
        />
      </InputGroup>
    </Form.Group>
  );
}

export default { ServiceType, ServiceRate };
