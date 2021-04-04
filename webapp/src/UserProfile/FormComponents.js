import React from "react";
import { Form, Col, InputGroup, FormControl } from "react-bootstrap";

function InputForm({ id, label, type, value, required, readOnly, onChange }) {
  return (
    <Form.Group as={Col} className="mx-lg-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={id}
        placeholder={label}
        defaultValue={value}
        onChange={onChange}
        readOnly={readOnly}
        required={required}
      />
    </Form.Group>
  );
}

function InputName({ input, onChange }) {
  return (
    <Form.Row>
      <InputForm
        id="firstname"
        label="First Name"
        value={input.firstname}
        onChange={onChange}
        required
      />
      <InputForm
        id="lastname"
        label="Last Name"
        value={input.lastname}
        onChange={onChange}
        required
      />
    </Form.Row>
  );
}

function InputPassword({ onChange }) {
  return (
    <Form.Row>
      <InputForm
        id="password"
        label="New Password"
        type="password"
        onChange={onChange}
      />
      <InputForm
        id="confirm"
        label="Confirm Password"
        type="password"
        onChange={onChange}
      />
    </Form.Row>
  );
}

function InputEmail({ input, onChange }) {
  return (
    <Form.Row>
      <InputForm
        id="email"
        label="Email Address"
        type="email"
        value={input.email}
        readOnly
        required
      />
      <Form.Group as={Col} className="mx-lg-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type="text"
            name="username"
            placeholder="Username"
            defaultValue={input.username}
            onChange={onChange}
            required
          />
        </InputGroup>
      </Form.Group>
    </Form.Row>
  );
}

function InputDetail({ input, onChange }) {
  return (
    <Form.Row>
      <InputForm
        id="mobileNumber"
        label="Phone Number"
        value={input.mobileNumber}
        onChange={onChange}
        required
      />

      <Form.Group as={Col} className="mx-lg-3">
        <Form.Label>Gender</Form.Label>
        <Form.Row>
          <Form.Check
            inline
            className="col px-2"
            type="radio"
            label="Male"
            name="gender"
            id="male"
            value="male"
            onChange={onChange}
            checked={input.gender === "male"}
            required
          />
          <Form.Check
            inline
            className="col px-2"
            type="radio"
            label="Female"
            name="gender"
            id="female"
            value="female"
            onChange={onChange}
            checked={input.gender === "female"}
            required
          />
        </Form.Row>
      </Form.Group>
    </Form.Row>
  );
}

export { InputName, InputPassword, InputEmail, InputDetail };
