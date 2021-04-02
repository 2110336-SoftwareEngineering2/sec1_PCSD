import React, { useContext, useState } from "react";
import {
  InputImage,
  InputType,
  InputText,
  InputGender,
} from "./FormComponents";
import defaultPetImg from "../petpic.png";
import "./PetForm.css";
function PetForm({ currentPet, savePet, cancelForm }) {
  const isNewPet = currentPet === null;
  const [input, setPetInfo] = useState(
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
    setPetInfo({
      ...input,
      [name]: name === "petImg" ? event.target.files[0] : event.target.value,
    });
  }

  function handleSubmit(event) {
    savePet({ ...input, hasImg: !!input.petImg }, isNewPet);
    event.preventDefault();
  }

  return (
    <form className="petform" onSubmit={handleSubmit}>
      <div className="row">
        <InputImage
          petImg={
            input.petImg ? URL.createObjectURL(input.petImg) : input.imgURL
          }
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <InputType petType={input.petType} onChange={handleChange} />
      </div>
      <div className="row">
        <InputText
          label="Pet Name"
          infoName="petName"
          petInfo={input.petName}
          onChange={handleChange}
        />
        <InputText
          label="Pet Breed"
          infoName="breed"
          petInfo={input.breed}
          onChange={handleChange}
        />
      </div>
      <div className="row">
        <InputText
          label="Pet Age"
          infoName="age"
          petInfo={input.age}
          onChange={handleChange}
        />
        <InputGender petGender={input.gender} onChange={handleChange} />
      </div>
      <div className="row">
        <button className="canclebutton" onClick={cancelForm}>
          Cancle
        </button>
        <div className="addbutton">
          <input className="submit" type="submit" value="Save Pet" />
        </div>
      </div>
    </form>
  );
}

export default PetForm;
