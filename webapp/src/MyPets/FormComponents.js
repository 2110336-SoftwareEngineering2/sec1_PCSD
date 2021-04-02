import React from "react";

function InputImage({ petImg, onChange }) {
  return (
    <div className="picture">
      <img src={petImg} />
      <label id="uploadpic">
        Upload Photo
        <input
          type="file"
          name="petImg"
          accept="image/png, image/jpeg"
          onChange={onChange}
        />
      </label>
    </div>
  );
}

function InputType({ petType, onChange }) {
  function PetType({ label }) {
    const type = label.toLowerCase();
    return (
      <label>
        <input
          type="radio"
          name="petType"
          value={type}
          onChange={onChange}
          checked={petType === type}
          required
        />
        {label}
      </label>
    );
  }

  return (
    <div className="pettype">
      <label>Pet Type</label>
      <br />
      <br />
      <div className="row">
        <div className="col-2" id="type">
          <PetType label="Dog" />
          <br />
          <PetType label="Cat" />
        </div>
        <div className="col-2" id="type">
          <PetType label="Rabbit" />
          <br />
          <PetType label="Bird" />
        </div>
        <div className="col-2" id="type">
          <PetType label="Hamster" />
          <br />
          <PetType label="Turtle" />
        </div>
      </div>
    </div>
  );
}

function InputText({ label, infoName, petInfo, onChange }) {
  return (
    <div className="col-6 petinfocol">
      <label>{label}</label>
      <input
        type="text"
        placeholder={label}
        name={infoName}
        onChange={onChange}
        value={petInfo}
        required
      />
    </div>
  );
}

function InputGender({ petGender, onChange }) {
  function PetGender({ label }) {
    const gender = label.toLowerCase();
    return (
      <label className="radio">
        {label}&nbsp;
        <input
          type="radio"
          name="gender"
          value={gender}
          onChange={onChange}
          checked={petGender === gender}
          required
        />
      </label>
    );
  }
  return (
    <div className="col-6 petinfocol">
      <label>Gender</label>
      <br />
      <br />
      <div>
        <PetGender label="Female" />
        &nbsp;
        <PetGender label="Male" />
      </div>
    </div>
  );
}

export { InputImage, InputType, InputText, InputGender };
