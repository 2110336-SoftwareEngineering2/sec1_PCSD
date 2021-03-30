import React, {useState} from 'react';
import "./ReserveForm.css";
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
function ReserveForm( {name}) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [selectedDate, handleDateChange] = useState(new Date());
    return (
        <div className="ReserveForm">
            <div className={classes.serviceTypeBox}>
          <h2 className={classes.h2}>Reserve {name}</h2>
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
        </div>
    )
}

export default ReserveForm;
