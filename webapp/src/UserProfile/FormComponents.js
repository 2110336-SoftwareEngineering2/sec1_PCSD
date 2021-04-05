import React from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";

function InputForm({ id, label, children }) {
  return (
    <Form.Group as={Col} className="mx-lg-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      {children}
    </Form.Group>
  );
}

function FirstName({ input, onChange }) {
  return (
    <InputForm id="firstname" label="First Name">
      <Form.Control
        type="text"
        name="firstname"
        placeholder="First Name"
        defaultValue={input.firstname}
        onChange={onChange}
        required
      />
    </InputForm>
  );
}

function LastName({ input, onChange }) {
  return (
    <InputForm id="lastname" label="Last Name">
      <Form.Control
        type="text"
        name="lastname"
        placeholder="Last Name"
        defaultValue={input.lastname}
        onChange={onChange}
        required
      />
    </InputForm>
  );
}

function NewPassword({ input, onChange }) {
  return (
    <InputForm id="new_password" label="New Password">
      <Form.Control
        autoComplete="new-password"
        pattern={"^" + input.confirm_password + "$"}
        type="password"
        name="new_password"
        placeholder="New Password"
        onChange={onChange}
        required={!!input.confirm_password}
      />
      <Form.Control.Feedback type="invalid">
        Passwords do not match.
      </Form.Control.Feedback>
    </InputForm>
  );
}

function ConfirmPassword({ input, onChange }) {
  return (
    <InputForm id="confirm_password" label="Confirm Password">
      <Form.Control
        autoComplete="new-password"
        pattern={"^" + input.new_password + "$"}
        type="password"
        name="confirm_password"
        placeholder="Confirm Password"
        onChange={onChange}
        required={!!input.new_password}
      />
      <Form.Control.Feedback type="invalid">
        Passwords do not match.
      </Form.Control.Feedback>
    </InputForm>
  );
}

function Email({ input }) {
  return (
    <InputForm id="email" label="Email Address">
      <Form.Control
        type="email"
        name="email"
        placeholder="Email Address"
        defaultValue={input.email}
        readOnly
        required
      />
    </InputForm>
  );
}

function Username({ input, onChange, valid }) {
  return (
    <InputForm id="username" label="Username">
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>@</InputGroup.Text>
        </InputGroup.Prepend>
        <Form.Control
          className={valid ? "valid" : "invalid"}
          type="text"
          name="username"
          placeholder="Username"
          defaultValue={input.username}
          onChange={onChange}
          required
        />
      </InputGroup>
    </InputForm>
  );
}

function MobileNumber({ input, onChange }) {
  return (
    <InputForm id="mobileNumber" label="Mobile Number">
      <Form.Control
        type="tel"
        pattern="[0-9]{10}"
        name="mobileNumber"
        placeholder="0991239876"
        defaultValue={input.mobileNumber}
        onChange={onChange}
        required
      />
    </InputForm>
  );
}

function GenderRadio({ gender, input, onChange }) {
  return (
    <Form.Check
      className={"col px-2 " + (input.gender === null ? "unfilled" : "filled")}
      type="radio"
      name="gender"
      label={gender}
      id={gender}
      value={gender}
      onChange={onChange}
      checked={input.gender === gender}
      inline
      required
    />
  );
}
function Gender({ input, onChange }) {
  return (
    <InputForm id="gender" label="Gender">
      <Form.Row>
        <GenderRadio gender="male" input={input} onChange={onChange} />
        <GenderRadio gender="female" input={input} onChange={onChange} />
      </Form.Row>
    </InputForm>
  );
}

function Submit({ modified }) {
  return (
    <div className="text-right mx-lg-3">
      <Button disabled={!modified} type="submit">
        Save Changes
      </Button>
    </div>
  );
}

export default {
  FirstName,
  LastName,
  NewPassword,
  ConfirmPassword,
  Email,
  Username,
  MobileNumber,
  Gender,
  Submit,
};
