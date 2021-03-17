import React, { useState } from "react";
import "./Addpet.css";
import "./Register_info.css";
import image from "./../petpic.png";

function Addpet({ onChange, input }) {
  const [img, setImage] = useState(image);

  function uploadImage(event) {
    const pic = URL.createObjectURL(event.target.files[0]);
    setImage(pic);
  }

  function handleChange(event) {
    onChange(event);
  }
  
  return (
    <div className="addpet">
      <div className="picture">
        <img src={img} />
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
        <br /><br/>
        <div className="row">
          <div className="col-2" id="type">
            <label>
              <input
                type="checkbox"
                name="petType"
                value="dog"
                onChange={handleChange}
              />{" "}
              Dog
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="petType"
                value="cat"
                onChange={handleChange}
              />{" "}
              Cat
            </label>
          </div>
          <div className="col-2" id="type">
            <label>
              <input
                type="checkbox"
                name="petType"
                value="rabbit"
                onChange={handleChange}
              />{" "}
              Rabbit
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="petType"
                value="bird"
                onChange={handleChange}
              />{" "}
              Bird
            </label>
          </div>
          <div className="col-3" id="type">
            <label>
              <input
                type="checkbox"
                name="petType"
                value="hamster"
                onChange={handleChange}
              />{" "}
              Hamster
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="petType"
                value="turtle"
                onChange={handleChange}
              />{" "}
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
              <RadioGender onChange={onChange} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Addpet;

class RadioGender extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: null };
    this.onValueChange = this.onValueChange.bind(this);
  }

  onValueChange(event) {
    this.setState({ selectedOption: event.target.value });
    this.props.onChange(event);
  }

  render() {
    return (
      <div>
        <label className="radio">
          Female&nbsp;
          <input
            type="radio"
            value="female"
            checked={this.state.selectedOption === "female"}
            name="gender"
            onChange={this.onValueChange}
          />
        </label>
        &nbsp;
        <label className="radio">
          Male&nbsp;
          <input
            type="radio"
            value="male"
            checked={this.state.selectedOption === "male"}
            name="gender"
            onChange={this.onValueChange}
          />
        </label>
      </div>
    );
  }
}
