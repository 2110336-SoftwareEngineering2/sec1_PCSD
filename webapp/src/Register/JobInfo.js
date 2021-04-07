import React, { useContext, useState } from "react";
import axios from "axios";

import "./JobInfo.css";
import { UserContext } from "../context/MyContext";
import history from "./../history";

function JobInfo() {
  const { user } = useContext(UserContext);
  const [values, setValue] = useState({
    caretaker: user.email,
    type: [],
    pet_type: [],
    rate: 0,
    city: "",
    province: "",
    country: "",
    description: "",
    available_day: [],
  });
  const [service, setService] = useState({
    housesitting: false,
    boarding: false,
    daycare: false,
  });
  const [petType, setPetType] = useState({
    dog: false,
    cat: false,
    rabbit: false,
    bird: false,
    hamster: false,
    turtle: false,
  });
  const [availdays, setAvailday] = useState({
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
  });

  const onServiceChange = (event) => {
    setService({
      ...service,
      [event.target.name]: !service[event.target.name],
    });
  };

  const onPetTypeChange = (event) => {
    setPetType({
      ...petType,
      [event.target.name]: !petType[event.target.name],
    });
  };

  const onChange = (event) => {
    setValue({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    for (const type in service) {
      if (service[type]) {
        const serviceType = values.type;
        serviceType.push(type);
        setValue({ ...values, type: serviceType });
      }
    }

    for (const type in petType) {
      if (petType[type]) {
        const _petType = values.pet_type;
        _petType.push(type);
        setValue({ ...values, pet_type: _petType });
      }
    }

    for (const day in availdays) {
        if (availdays[day]) {
          const availday = values.available_day;
          availday.push(day);
          setValue({ ...values, available_day: availday });
        }
      }

    setValue({ ...values, caretaker: user.email, reserved: "No" });

    axios
        .post("http://localhost:4000/user/caretaker", values)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });

    history.push({pathname: "/"});
  };

  return (
    <div className="jobinfobox">
      <div className="jobinfo">
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-4 jobinfocol">
              <label>Service Type</label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="housesitting"
                  onChange={onServiceChange}
                  checked={service.housesitting}
                />
                &nbsp;House Sitting
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="boarding"
                  onChange={onServiceChange}
                  checked={service.boarding}
                />
                &nbsp;Boarding
              </label>
              <br />
              <label>
                <input
                  type="checkbox"
                  name="daycare"
                  onChange={onServiceChange}
                  checked={service.daycare}
                />
                &nbsp;Day Care
              </label>
              <br />
              <br />
              <label>Rate per hour (baht)</label>
              <br />
              <input
                className="texting"
                type="number"
                name="rate"
                value={values.rate}
                onChange={onChange}
              />
            </div>
            <div className="col-4 jobinfocol">
              <label>Service Area</label>
              <br />
              <label>City:</label>&nbsp; &nbsp;
              <input
                className="texting"
                type="text"
                name="city"
                value={values.city}
                onChange={onChange}
              />
              <br />
              <label>Province:</label>&nbsp; &nbsp;
              <input
                className="texting"
                type="text"
                name="province"
                value={values.province}
                onChange={onChange}
              />
              <br />
              <label>Country:</label>&nbsp; &nbsp;
              <input
                className="texting"
                type="text"
                name="country"
                value={values.country}
                onChange={onChange}
              />
            </div>
            <div className="col-4 jobinfocol">
              <label>Description</label>
              <br />
              <textarea
                className="texting"
                name="description"
                value={values.description}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 jobinfocol">
              <label>Pet Type</label>
              <br />
              <div className="row">
                <div className="col-6 jobinfocol animalcheckbox">
                  <label>
                    <input
                      type="checkbox"
                      name="dog"
                      checked={petType.dog}
                      onChange={onPetTypeChange}
                    />
                    &nbsp;Dog
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="cat"
                      checked={petType.cat}
                      onChange={onPetTypeChange}
                    />
                    &nbsp;Cat
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="rabbit"
                      checked={petType.rabbit}
                      onChange={onPetTypeChange}
                    />
                    &nbsp;Rabbit
                  </label>
                </div>
                <div className="col-6 jobinfocol animalcheckbox">
                  <label>
                    <input
                      type="checkbox"
                      name="bird"
                      checked={petType.bird}
                      onChange={onPetTypeChange}
                    />
                    &nbsp;Bird
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="hamster"
                      checked={petType.hamster}
                      onChange={onPetTypeChange}
                    />
                    &nbsp;Hamster
                  </label>
                  <br />
                  <label>
                    <input
                      type="checkbox"
                      name="turtle"
                      checked={petType.turtle}
                      onChange={onPetTypeChange}
                    />
                    &nbsp;Turtle
                  </label>
                </div>
              </div>
            </div>
            <div className="col-9 jobinfocol availdaysbox">
              <label>Available Day(s)</label>
              <br />
              <br />
              <AvailableDays setAvailday={setAvailday} availdays={availdays} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 jobinfocol signupbutton">
              <button
                className="signup"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobInfo;

class AvailableDays extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClicked = this.handleOnClicked.bind(this);
  }

  handleOnClicked(event) {
    const name = event.target.name;
    const val = this.props.availdays[name];
    if (val !== null) {
      event.target.style.backgroundColor = "white";
      event.target.style.color = "#8e8e8e";
      this.props.setAvailday({ ...this.props.availdays, [name]: null });
    } else {
      event.target.style.backgroundColor = "#9d7f70";
      event.target.style.color = "white";
      this.props.setAvailday({ ...this.props.availdays, [name]: name });
    }
  }

  render() {
    return (
      <div className="availdays">
        <button
          name="mon"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.mon}
        >
          Mon
        </button>
        &nbsp; &nbsp;
        <button
          name="tue"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.tue}
        >
          Tue
        </button>
        &nbsp; &nbsp;
        <button
          name="wed"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.wed}
        >
          Wed
        </button>
        &nbsp; &nbsp;
        <button
          name="thu"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.thu}
        >
          Thu
        </button>
        &nbsp; &nbsp;
        <button
          name="fri"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.fri}
        >
          Fri
        </button>
        &nbsp; &nbsp;
        <button
          name="sat"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.sat}
        >
          Sat
        </button>
        &nbsp; &nbsp;
        <button
          name="sun"
          type="button"
          onClick={this.handleOnClicked}
          value={this.props.availdays.sun}
        >
          Sun
        </button>
      </div>
    );
  }
}
