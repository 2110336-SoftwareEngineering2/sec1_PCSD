import React from "react";
import {
  Button,
  BottomNavigation,
  BottomNavigationAction,
  TextField,
} from "@material-ui/core";

import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import useStyles from "./styles";

const SearchBox = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <div className={classes.searchBox}>
      <div className={classes.animalType}>
        <h3>looking for to take care my:</h3>
        <label className={classes.label}>
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
        </label>
      </div>
      <div className={classes.upperSection}>
        <div className={classes.serviceTypeBox}>
          <h2 className={classes.h2}>For</h2>
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
              variant="outlined"
              size="small"
              placeholder="Min"
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
              variant="outlined"
              size="small"
              placeholder="Max"
            />
            <h4 style={{ margin: "10px 0px 0px 10px" }}>Baht</h4>
          </div>
        </div>
      </div>
      <div className={classes.lowerSection}>
        <div className={classes.cityBox}>
          <h2 className={classes.h2}>City</h2>
          <TextField
            className={classes.cityInput}
            variant="outlined"
            size="small"
            placeholder="Zip Code or Address"
          />
        </div>
        <div className={classes.dateBox}>
          <h2 className={classes.h2}>Date</h2>
          <div className={classes.dateBoxLine2}>
            <TextField
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
                margin: "0 0 0 3%",
                fontSize: "28px",
              }}
            >
              &#8594;
            </p>
            <TextField
              variant="outlined"
              type="date"
              className={classes.dateInput}
              size="small"
            />
          </div>
        </div>
      </div>
      <Button className={classes.button} variant="contained">
        Search
      </Button>
    </div>
  );
};

export default SearchBox;
