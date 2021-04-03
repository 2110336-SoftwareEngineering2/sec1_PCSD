import React from "react";
import "./Addpet.css";
import "./Register_info.css";

function Addpet({ onChange, input }) {
  const petImg = !input.petImg
    ? input.imgURL
    : URL.createObjectURL(input.petImg);

  function uploadImage(event) {
    console.log(event.target.value);
    onChange({
      target: {
        name: "petImg",
        value: event.target.files[0],
      },
    });
  }

  function handleChange(event) {
    onChange(event);
  }

  return (
    <div className="addpet">
      <div className="picture">
        <img src={petImg} />
        <label id="uploadpic">
          Upload Photo{" "}
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={uploadImage}
          />
        </label>
      </div>
      <div className="pettype">
        <label>Pet Type</label>
        <br />
        <br />
        <div className="row">
          <div className="col-2" id="type">
            <label>
              <input
                type="radio"
                name="petType"
                value="dog"
                onChange={handleChange}
                checked={input.petType === "dog"}
              />
              Dog
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="petType"
                value="cat"
                onChange={handleChange}
                checked={input.petType === "cat"}
              />
              Cat
            </label>
          </div>
          <div className="col-2" id="type">
            <label>
              <input
                type="radio"
                name="petType"
                value="rabbit"
                onChange={handleChange}
                checked={input.petType === "rabbit"}
              />
              Rabbit
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="petType"
                value="bird"
                onChange={handleChange}
                checked={input.petType === "bird"}
              />
              Bird
            </label>
          </div>
          <div className="col-3" id="type">
            <label>
              <input
                type="radio"
                name="petType"
                value="hamster"
                onChange={handleChange}
                checked={input.petType === "hamster"}
              />
              Hamster
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="petType"
                value="turtle"
                onChange={handleChange}
                checked={input.petType === "turtle"}
              />
              Turtle
            </label>
          </div>
        </div>
      </div>
      <div className="pet__info">
        <form>
          <div className="row">
            <div className="col-6 petinfocol">
              <label>Pet Name</label>
              <input
                type="text"
                placeholder="Your Pet Name"
                name="petName"
                onChange={handleChange}
                value={input.petName}
              ></input>
            </div>
            <div className="col-6 petinfocol">
              <label>Breed</label>
              <input
                type="text"
                placeholder="Breed of you pet"
                name="breed"
                onChange={handleChange}
                value={input.breed}
              ></input>
            </div>
          </div>
          <div className="row">
            <div className="col-6 petinfocol">
              <label>Age</label>
              <input
                type="text"
                name="age"
                placeholder="Your Pet Age"
                value={input.age}
                onChange={handleChange}
              ></input>
            </div>
            <div className="col-6 petinfocol">
              <label>Gender</label>
              <br />
              <br />
              <div>
                <label className="radio">
                  Female&nbsp;
                  <input
                    type="radio"
                    value="female"
                    checked={input.gender === "female"}
                    name="gender"
                    onChange={onChange}
                  />
                </label>
                &nbsp;
                <label className="radio">
                  Male&nbsp;
                  <input
                    type="radio"
                    value="male"
                    checked={input.gender === "male"}
                    name="gender"
                    onChange={onChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addpet;