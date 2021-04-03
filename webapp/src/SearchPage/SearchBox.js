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
    maxrate: ""
  });

  const searchHandle = () => {
    const minmax = [parseInt(value.minrate), parseInt(value.maxrate)];
    axios.post("http://localhost:4000/user/caretaker/search", {
      minrate: minmax[0] > 0 ? minmax[0] : null,
      maxrate: minmax[1] > 0 ? (minmax[1] > minmax[0] ? minmax[1] : null) : null,
    })
    .then((res) => {
      console.log(res.data);
      history.push( {pathname: "/searchresult", state: res.data});
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const onChange = (event) => {
    setValue({...value, [event.target.name]: event.target.value})
  }

  return (
    <div className={classes.searchBox}>
      <div className={classes.animalType}>
        <h3 className={classes.h3}>Looking for to take care my:</h3>
        <FormGroup row>
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" />}
            label="Dog"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" />}
            label="Cat"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" />}
            label="Rabbit"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" />}
            label="Bird"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" />}
            label="Hamster"
          />
          <FormControlLabel
            className={classes.searchBoxFormControlLabel}
            control={<Checkbox name="checkedA" color="primary" />}
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
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction
              className={classes.serviceBox}
              label="House Sitting"
              icon={<NightsStayIcon />}
            />
            <BottomNavigationAction
              className={classes.serviceBox}
              label="Boarding"
              icon={<LocalAirportIcon />}
            />
            <BottomNavigationAction
              className={classes.serviceBox}
              label="Day Care"
              icon={<WbSunnyIcon />}
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
          />
        </div>
        <div className={classes.dateBox}>
          <h2 className={classes.h2}>For these days</h2>
          <div className={classes.dateBoxLine2}>
            <TextField
              inputProps={{
                style: { opacity: 0.5 },
              }}
              variant="outlined"
              type="date"
              format={"DD/MM/YYYY"}
              className={classes.dateInput}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
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
              }}
              variant="outlined"
              type="date"
              className={classes.dateInput}
              size="small"
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
