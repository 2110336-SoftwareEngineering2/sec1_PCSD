import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";

import Input from "./FormComponents";
import defaultPetImg from "../petpic.png";

function PetForm({ currentPet, savePet, cancelForm }) {
  const [submitted, setSubmitted] = useState(false);
  const [modified, setModified] = useState(false);
  const isNewPet = currentPet === null;
  const [input, setInput] = useState(
    currentPet || {
      petType: null,
      petName: "",
      breed: "",
      age: "",
      gender: null,
      imgURL: defaultPetImg,
      petImg: null,
    }
  );

  function handleChange({ target: { name, value, files } }) {
    setInput({
      ...input,
      [name]: name === "petImg" ? files[0] : value,
    });
    setModified(true);
  }

  function handleSubmit(event) {
    savePet({ ...input, hasImg: !!input.petImg }, isNewPet);
    setSubmitted(true);
    event.preventDefault();
  }

  return (
    <Form validated={modified} onSubmit={handleSubmit}>
      <fieldset disabled={submitted}>
        <Form.Row>
          <Col md>
            <Form.Row>
              <Input.PetImage input={input} onChange={handleChange} />
            </Form.Row>
            <Form.Row>
              <Input.PetType input={input} onChange={handleChange} />
              <Input.PetGender input={input} onChange={handleChange} />
            </Form.Row>
          </Col>
          <Col md>
            <Input.PetName input={input} onChange={handleChange} />
            <Input.PetBreed input={input} onChange={handleChange} />
            <Input.PetAge input={input} onChange={handleChange} />
            <Input.Submit
              modified={modified}
              submitted={submitted}
              onCancel={cancelForm}
            />
          </Col>
        </Form.Row>
      </fieldset>
    </Form>
  );
}
export default PetForm;
