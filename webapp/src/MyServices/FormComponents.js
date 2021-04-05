import React from "react";
import { Form, Button, Col, InputGroup } from "react-bootstrap";

function Choice_({ name, label, checked, onChange, className, hidden }) {
  const id = label.replace(" ", "");
  return (
    <Form.Check
      type="checkbox"
      name={name}
      id={id}
      value={id}
      label={!hidden && label}
      checked={checked}
      onChange={onChange}
      className={className}
      hidden={hidden}
    />
  );
}

function Text_({ label, input, onChange }) {
  const id = label.replace(" ", "");
  return (
    <Form.Group as={Form.Row} className="mx-0" controlId={id}>
      <Form.Label className="text-right my-2 mr-2" style={{ width: "50px" }}>
        {label}
      </Form.Label>
      <Col>
        <Form.Control
          type="text"
          name={id}
          placeholder={label}
          defaultValue={input[id]}
          onChange={onChange}
          required
        />
      </Col>
    </Form.Group>
  );
}

function ServiceType({ input, onChange }) {
  const choice = (type) => {
    const checked = input.type.includes(type.replace(" ", ""));
    return (
      <Choice_ name="type" label={type} checked={checked} onChange={onChange} />
    );
  };
  return (
    <Form.Group className="px-2 mx-lg-3">
      <Form.Label>Service Types</Form.Label>
      <Col className="px-1 px-md-3 border rounded">
        {choice("house sitting")}
        {choice("boarding")}
        {choice("day care")}
      </Col>
    </Form.Group>
  );
}

function ServiceRate({ input, onChange }) {
  return (
    <Form.Group className="px-2 mx-lg-3" controlId="rate">
      <Form.Label>
        Service Rate <sub className="text-danger">(per hour)</sub>
      </Form.Label>
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text className="text-danger">฿</InputGroup.Text>
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

function ServiceArea({ input, onChange }) {
  const text = (label) => {
    return <Text_ label={label} input={input} onChange={onChange} />;
  };
  return (
    <Form.Group className="px-2 mx-lg-3">
      <Form.Label>Service Area</Form.Label>
      <div className="px-1 pt-3 px-md-3 border rounded">
        {text("city")}
        {text("province")}
        {text("country")}
      </div>
    </Form.Group>
  );
}

function Description({ input, onChange }) {
  return (
    <Form.Group className="px-2 mx-lg-3" controlId="description">
      <Form.Label>Description</Form.Label>
      <Form.Control
        as="textarea"
        name="description"
        placeholder="Tell us more about you."
        defaultValue={input.description}
        onChange={onChange}
        rows="7"
        style={{ "min-height": "40px", "max-height": "159px" }}
      />
    </Form.Group>
  );
}

function PetType({ input, onChange }) {
  const choice = (pet) => {
    const checked = input.pet_type.includes(pet);
    return (
      <Choice_
        name="pet_type"
        label={pet}
        checked={checked}
        onChange={onChange}
        className="col"
      />
    );
  };
  return (
    <Form.Group className="px-2 mx-lg-3">
      <Form.Label>Pet Types</Form.Label>
      <Col className="px-1 px-md-3 border rounded">
        <Form.Row>
          {choice("dog")}
          {choice("cat")}
          {choice("rabbit")}
        </Form.Row>
        <Form.Row>
          {choice("bird")}
          {choice("turtle")}
          {choice("hamster")}
        </Form.Row>
      </Col>
    </Form.Group>
  );
}

function AvailableDay({ input, onChange }) {
  const choice = (day) => {
    const checked = input.available_day.includes(day);
    return (
      <Col className="py-lg-1 text-center" xs="3" sm="4" md="3" lg>
        <Button
          variant="secondary"
          onClick={() => document.getElementById(day).click()}
          type="button"
          name="available_day"
          id={"button_" + day}
          active={checked}
        >
          {day.toUpperCase()}
        </Button>
        <Choice_
          name="available_day"
          label={day}
          checked={checked}
          onChange={onChange}
          hidden
        />
      </Col>
    );
  };

  return (
    <Form.Group className="px-2 mx-lg-3">
      <Form.Label>Available Days</Form.Label>
      <Form.Row className="justify-content-center px-md-3 py-lg-2 border rounded">
        {choice("mon")}
        {choice("tue")}
        {choice("wed")}
        {choice("thu")}
        {choice("fri")}
        {choice("sat")}
        {choice("sun")}
      </Form.Row>
    </Form.Group>
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
  ServiceType,
  ServiceRate,
  ServiceArea,
  Description,
  PetType,
  AvailableDay,
  Submit,
};
