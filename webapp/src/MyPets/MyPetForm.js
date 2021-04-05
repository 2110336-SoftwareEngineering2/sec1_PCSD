import React, { useContext, useState } from "react";
import { Form, Col } from "react-bootstrap";

import Header from "../Header/header";
import {
  InputImage,
  InputType,
  InputText,
  InputGender,
} from "./FormComponents";
import defaultPetImg from "../petpic.png";
import "./PetForm.css";

function PetForm({ currentPet = null, savePet, cancelForm }) {
  const isNewPet = currentPet === null;
  const [input, setInput] = useState(
    currentPet || {
      petType: "",
      petName: "",
      breed: "",
      age: "",
      gender: "",
      imgURL: defaultPetImg,
      petImg: null,
    }
  );

  function handleChange(event) {
    const name = event.target.name;
    setInput({
      ...input,
      [name]: name === "petImg" ? event.target.files[0] : event.target.value,
    });
  }

  function handleSubmit(event) {
    console.log("Petform submitted");
    event.preventDefault();
  }

  return (
    <div>
      <Header />
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <InputImage
            petImg={
              input.petImg ? URL.createObjectURL(input.petImg) : input.imgURL
            }
            onChange={handleChange}
          />
          <InputType petType={input.petType} onChange={handleChange} />
        </Form.Row>
        <Form.Row>
        </Form.Row>
        <Form.Row></Form.Row>
      </Form>
    </div>
  );
}
export default PetForm;
