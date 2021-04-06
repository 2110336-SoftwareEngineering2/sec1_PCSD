import { Image, Form, Col, Button, Spinner } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

function Choice_({ name, label, checked, onChange, className, hidden }) {
  const id = label.replace(" ", "");
  return (
    <Form.Check
      type="radio"
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

function Text_({ id, label, input, onChange }) {
  return (
    <Form.Group className="col px-2 mx-lg-3" controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        name={id}
        placeholder={label}
        defaultValue={input[id]}
        onChange={onChange}
        required
      />
    </Form.Group>
  );
}

function PetImage({ input, onChange }) {
  return (
    <Form.Group as={Col}>
      <Form.Label>Pet Photo</Form.Label>
      <Col className="border rounded">
        <Form.Row className="align-items-center">
          <Col className="text-center" xs sm="6" md="5">
            <Image
              className="my-1"
              style={{ width: "120px" }}
              src={
                input.petImg ? URL.createObjectURL(input.petImg) : input.imgURL
              }
              roundedCircle
            />
          </Col>
          <Col className="text-center" xs sm md>
            <Button onClick={() => document.getElementById("petImg").click()}>
              Choose Photo
            </Button>
            <Form.File
              id="petImg"
              accept="image/png, image/jpeg"
              name="petImg"
              onChange={onChange}
              hidden
            />
            <Form.Text
              className="text-muted small mt-3"
              minWidth="120px"
            >
              Acceptable formats: <b className="text-dark">JPG, PNG</b>
            </Form.Text>
            <Form.Text className="text-muted small">
              Max file size: <b className="text-dark">500 KB</b>
            </Form.Text>
          </Col>
        </Form.Row>
      </Col>
    </Form.Group>
  );
}

function PetType({ input, onChange }) {
  const choice = (type) => {
    const checked = input.petType == type;
    return (
      <Choice_
        name="petType"
        label={type}
        checked={checked}
        onChange={onChange}
        className="col"
      />
    );
  };
  return (
    <Form.Group as={Col} xs="8" className="px-2">
      <Form.Label>Pet Type</Form.Label>
      <Col className="px-1 border rounded">
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

function PetGender({ input, onChange }) {
  const choice = (gender) => {
    const checked = input.gender == gender;
    return (
      <Choice_
        name="gender"
        label={gender}
        checked={checked}
        onChange={onChange}
        className="col"
      />
    );
  };
  return (
    <Form.Group as={Col} xs="4" className="px-2">
      <Form.Label>Pet Gender</Form.Label>
      <Col className="px-1 px-md-3 border rounded">
        <Form.Row>{choice("male")}</Form.Row>
        <Form.Row>{choice("female")}</Form.Row>
      </Col>
    </Form.Group>
  );
}

function PetName({ input, onChange }) {
  return (
    <Text_ id="petName" label="Pet Name" input={input} onChange={onChange} />
  );
}

function PetBreed({ input, onChange }) {
  return (
    <Text_ id="breed" label="Pet Breed" input={input} onChange={onChange} />
  );
}

function PetAge({ input, onChange }) {
  return <Text_ id="age" label="Pet Age" input={input} onChange={onChange} />;
}

function Submit({ modified, submitted, onCancel }) {
  return (
    <div className="text-right mx-lg-3">
      <Button variant="outline-dark" type="button" onClick={onCancel}>
        Cancel
      </Button>
      &nbsp; &nbsp;
      <Button disabled={!modified} type="submit">
        {submitted ? (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        ) : null}
        {submitted ? " Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}

export default {
  PetImage,
  PetType,
  PetGender,
  PetName,
  PetBreed,
  PetAge,
  Submit,
};
