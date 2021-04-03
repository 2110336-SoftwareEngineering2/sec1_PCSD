import React from "react";
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
  TextField,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import axios from "axios";

import history from "../history";
import useStyles from "./styles";

const SearchBox = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState({
    minrate: "",
    maxrate: "",
    type: "",
    date: {
      start: "",
      end: ""
    },
    address: "",
  });

  const getSearchData = () => {
    const minmax = [parseInt(value.minrate), parseInt(value.maxrate)];
    const pet_type = getPetType();
    const data = {
      minrate: minmax[0] > 0 ? minmax[0] : null,
      maxrate: minmax[1] > 0 ? (minmax[1] > minmax[0] ? minmax[1] : null) : null,
      pet_type: pet_type,
      type: value.type !== "" ? value.type : null,
      date: (value.date.start !== "" && value.date.end !== "") ? value.date : null,
      address: (value.address !== "") ? value.address : null
    }
    return data;
  }

  const searchHandle = () => {
    const data = getSearchData();
    axios.post("http://localhost:4000/user/caretaker/search", data)
    .then((res) => {
      history.push( {pathname: "/searchresult", state: res.data, data: value});
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const getPetType = () => {
    const pet_type = []
    const petChecker = document.getElementsByName("checkedA")

    for(var i = 0; i<petChecker.length; i++) {
      if(petChecker[i].checked == true) {
        pet_type.push(petChecker[i].value);
      }
    }

    return pet_type.length > 0 ? pet_type : null
  }

  const onChange = (event) => {
    setValue({...value, [event.target.name]: event.target.value})
  }

  const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  return (
    <div className={classes.searchBox}>
      <div className={classes.animalType}>
        <h3 className={classes.h3}>Looking for to take care my:</h3>
        <FormGroup row>
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" value="dog" />}
            label="Dog"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" value="cat" />}
            label="Cat"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" value="rabbit" />}
            label="Rabbit"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" value="bird" />}
            label="Bird"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" value="hamster" />}
            label="Hamster"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" value="turtle" />}
            label="Turtle"
          />
        </FormGroup>
        {/* <label className={classes.label}>
          <input type="checkbox" name="petType" value="dog" /> Dog
        </label>
        <label className={classes.label}>
          <input type="checkbox" name="petType" value="cat" /> Cat
        </label>
        <label className={classes.label}>
          <input type="checkbox" name="petType" value="rabbit" /> Rabbit
        </label>
        <label className={classes.label}>
          <input type="checkbox" name="petType" value="bird" /> Bird
        </label>
        <label className={classes.label}>
          <input type="checkbox" name="petType" value="hamster" /> Hamster
        </label>
        <label className={classes.label}>
          <input type="checkbox" name="petType" value="turtle" /> Turtle
        </label> */}
      </div>
      <div className={classes.upperSection}>
        <div className={classes.serviceTypeBox}>
          <h2 className={classes.h2}>For When You're Away</h2>
          <BottomNavigation
            value={value.type}
            onChange={(event, newValue) => {
              if(value.type === "" | value.type !== newValue)
                setValue({...value, type: newValue});
              else
              setValue({...value, type: ""});
            }}
            showLabels
          >
            <BottomNavigationAction
              className={classes.serviceBox}
              label="House Sitting"
              icon={<NightsStayIcon />}
              value="housesitting"
            />
            <BottomNavigationAction
              className={classes.serviceBox}
              label="Boarding"
              icon={<LocalAirportIcon />}
              value="boarding"
            />
            <BottomNavigationAction
              className={classes.serviceBox}
              label="Day Care"
              icon={<WbSunnyIcon />}
              value="daycare"
            />
          </BottomNavigation>
        </div>
        <div className={classes.priceBox}>
          <h2 className={classes.h2}>Rate</h2>
          <div className={classes.priceBoxLine2}>
            <TextField
              className={classes.priceInput}
              type="number"
              variant="outlined"
              size="small"
              placeholder="Min"
              name="minrate"
              value={value.minrate}
              onChange={onChange}
            />
            <h3
              style={{
                margin: "20px 0px 0px 5%",
                height: "1px",
                width: "20px",
                border: "1px ridge grey",
              }}
            ></h3>
            <TextField
              className={classes.priceInput}
              type="number"
              variant="outlined"
              size="small"
              placeholder="Max"
              name="maxrate"
              value={value.maxrate}
              onChange={onChange}
            />
            <h4 style={{ margin: "10px 0px 0px 10px", opacity: "0.5" }}>
              Baht
            </h4>
          </div>
        </div>
      </div>
      <div className={classes.lowerSection}>
        <div className={classes.cityBox}>
          <h2 className={classes.h2}>Near by</h2>
          <TextField
            className={classes.cityInput}
            variant="outlined"
            size="small"
            placeholder="Zip Code or Address"
            name="address"
            value={value.address}
            onChange={onChange}
          />
        </div>
        <div className={classes.dateBox}>
          <h2 className={classes.h2}>For these days</h2>
          <div className={classes.dateBoxLine2}>
            <TextField
              inputProps={{
                style: { opacity: 0.5 },
                min: getToday()
              }}
              variant="outlined"
              type="date"
              format={"DD/MM/YYYY"}
              className={classes.dateInput}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              value={value.date.start}
              onChange={(event) => {
                setValue({...value, date: {start: event.target.value, end: value.date.end}})
              }}
            />
            <p
              style={{
                margin: "0 20px 0 20px",
                fontSize: "25px",
                opacity: "0.5",
              }}
            >
              &#8594;
            </p>
            <TextField
              inputProps={{
                style: { opacity: 0.5 },
                min: value.date.start
              }}
              variant="outlined"
              type="date"
              className={classes.dateInput}
              size="small"
              value={value.date.end}
              onChange={(event) => {
                setValue({...value, date: {start: value.date.start, end: event.target.value}})
              }}
            />
          </div>
        </div>
      </div>
      <Button className={classes.button} variant="contained" onClick={searchHandle}>
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
