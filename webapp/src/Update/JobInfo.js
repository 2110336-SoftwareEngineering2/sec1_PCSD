import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import "./JobInfo.css";
import { UserContext } from "../context/MyContext";
import history from "./../history";

function JobInfo() {
    const { user } = useContext(UserContext);
    
    useEffect(() => {
        axios
        .post("http://localhost:4000/user/caretaker/find", {caretaker: user.email})
        .then((res) => {
            const data = res.data;
            setValue({...data, rate: data.rate.$numberDecimal});
            var _tmp = {};
            for (var i = 0; i < data.type.length; i++) {
                _tmp[data.type[i]] = true;
            };
            setService({...service, ..._tmp,});
            _tmp = {}
            for (var i = 0; i < data.pet_type.length; i++) {
                _tmp[data.pet_type[i]] = true;
            }
            setPetType({...petType, ..._tmp});
            _tmp = {}
            for (var i = 0; i < data.available_day.length; i++) {
                _tmp[data.available_day[i]] = data.available_day[i];
            }
            setAvailday({...availdays, ..._tmp});
    })
    .catch((err) => {
        console.log(err);
    });

  }, []);

  const [values, setValue] = useState({});

  const serviceType = {
    housesitting: false,
    boarding: false,
    daycare: false,
  };
  const [service, setService] = useState({
    ...serviceType
  });

  const currentPetType = {
    dog: false,
    cat: false,
    rabbit: false,
    bird: false,
    hamster: false,
    turtle: false,
  };
  const [petType, setPetType] = useState({
    ...currentPetType,
  });

  const currentAvailday = {
    mon: null,
    tue: null,
    wed: null,
    thu: null,
    fri: null,
    sat: null,
    sun: null,
  };
  const [availdays, setAvailday] = useState({
    ...currentAvailday,
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

    const sentValues = values;

    const _service = [];
    for (const type in service) {
      if (service[type]) {
        _service.push(type);
      }
    }
    setValue({ ...values, type: _service });
    sentValues.type = _service;

    const _petType = [];
    for (const type in petType) {
      if (petType[type]) {
        _petType.push(type);
      }
    }
    setValue({ ...values, pet_type: _petType });
    sentValues.pet_type = _petType;

    const _availday = [];
    for (const day in availdays) {
      if (availdays[day]) {
        _availday.push(day);
      }
    }
    setValue({ ...values, available_day: _availday });
    sentValues.available_day = _availday;

    axios
      .post("http://localhost:4000/user/edit/caretaker", sentValues)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });

    window.alert("Change(s) saved!")
    history.push({ pathname: "/" });
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
              <button className="updatechange" type="submit">
                Save Change
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobInfo;

function AvailableDays(props) {

  const startColor = () => {
    for(const day in props.availdays) {
      var element = document.getElementById(day);
        const val = props.availdays[day];
        if (val !== null) {
            element.style.backgroundColor = "#9d7f70";
            element.style.color = "white";
        } else {
            element.style.backgroundColor = "white";
            element.style.color = "#8e8e8e";
        }
      }
  }

  useEffect(() => {
    startColor()
  }, [props]);

  const handleOnClicked = (event) => {
    const name = event.target.name;
    const val = props.availdays[name];
    if (val !== null) {
      event.target.style.backgroundColor = "white";
      event.target.style.color = "#8e8e8e";
      props.setAvailday({ ...props.availdays, [name]: null });
    } else {
      event.target.style.backgroundColor = "#9d7f70";
      event.target.style.color = "white";
      props.setAvailday({ ...props.availdays, [name]: name });
    }
  }

  return (
    <div className="availdays">
      <button
        id="mon"
        name="mon"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.mon}
      >
        Mon
      </button>
      &nbsp; &nbsp;
      <button
        id="tue"
        name="tue"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.tue}
      >
        Tue
      </button>
      &nbsp; &nbsp;
      <button
        id="wed"
        name="wed"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.wed}
      >
        Wed
      </button>
      &nbsp; &nbsp;
      <button
        id="thu"
        name="thu"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.thu}
      >
        Thu
      </button>
      &nbsp; &nbsp;
      <button
        id="fri"
        name="fri"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.fri}
      >
        Fri
      </button>
      &nbsp; &nbsp;
      <button
        id="sat"
        name="sat"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.sat}
      >
        Sat
      </button>
      &nbsp; &nbsp;
      <button
        id="sun"
        name="sun"
        type="button"
        onClick={handleOnClicked}
        value={props.availdays.sun}
      >
        Sun
      </button>
    </div>
  );
}
