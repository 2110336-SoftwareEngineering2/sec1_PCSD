import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";

import useStyles from "./styles";

const SideSearchBox = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.data);
  const [state, setState] = React.useState({
    checkedDog: false,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const onChange = (event) => {
    setValue({...value, [event.target.name]: event.target.value})
  }
  
  const getSearchData = () => {
    const minmax = [parseInt(value.minrate), parseInt(value.maxrate)];
    // const pet_type = getPetType();
    const data = {
      minrate: minmax[0] > 0 ? minmax[0] : null,
      maxrate: minmax[1] > 0 ? (minmax[1] > minmax[0] ? minmax[1] : null) : null,
      // pet_type: pet_type,
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
      props.setState(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
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
    <div className={classes.sideSearchBox}>
      <Typography className={classes.header} variant="h4">
        Service Type
      </Typography>
      <FormControl variant="outlined" className={classes.formControl}>
        <Select
          native
          autoWidth={true}
          inputProps={{
            style: {
              fontSize: 25,
              lineHeight: "normal",
              opacity: "0.5",
            },
          }}
          variant="outlined"
          name="type"
          onChange={onChange}
        >
          <option value="housesitting" selected={value.type === "housesitting"}>House Siting</option>
          <option value="boarding" selected={value.type === "boarding"}>Boarding</option>
          <option value="daycare" selected={value.type === "daycare"}>Day Care</option>
          <option value="" selected={value.type === ""}>---</option>
        </Select>
      </FormControl>
      <Typography className={classes.header} variant="h4">
        City
      </Typography>
      <TextField
        className={classes.sideCityInput}
        inputProps={{
          style: { fontSize: 20 },
        }}
        variant="outlined"
        size="small"
        name="address"
        value={value.address}
        onChange={onChange}
      />
      <Typography className={classes.header} variant="h4">
        Rate
      </Typography>
      <div className={classes.sidePriceSection}>
        <TextField
          className={classes.sidePriceInput}
          variant="outlined"
          size="small"
          type="number"
          name="minrate"
          value={value.minrate}
          onChange={onChange}
        />
        <p
          style={{
            margin: "0 12px 0 12px",
            fontSize: "28px",
            opacity: "0.5",
          }}
        >
          &#8594;
        </p>
        <TextField
          className={classes.sidePriceInput}
          variant="outlined"
          size="small"
          type="number"
          name="maxrate"
          value={value.maxrate}
          onChange={onChange}
        />
      </div>
      <Typography className={classes.header} variant="h4">
        Date
      </Typography>
      <div className={classes.sidePriceSection}>
        <TextField
          className={classes.sideDateInput}
          inputProps={{
            classes: {
              input: classes.datePlaceHolder,
            },
            min: getToday(),
          }}
          type="date"
          variant="outlined"
          size="small"
          value={value.date.start}
          onChange={(event) => {
            if(new Date(event.target.value) > new Date(value.date.end)) {
              setValue({...value, date: {start: event.target.value, end: ""}})
            } else {
              setValue({...value, date: {start: event.target.value, end: value.date.end}})
            }
          }}
        />
        <p
          style={{
            margin: "0 1px 0 1px",
            fontSize: "24px",
            opacity: "0.5",
          }}
        >
          &#8594;
        </p>
        <TextField
          className={classes.sideDateInput}
          inputProps={{
            classes: {
              input: classes.datePlaceHolder,
            },
            min: (value.date.start === "") ? getToday() : value.date.start
          }}
          type="date"
          variant="outlined"
          size="small"
          value={value.date.end}
          onChange={(event) => {
            setValue({...value, date: {start: value.date.start, end: event.target.value}})
          }}
        />
      </div>
      <Typography className={classes.header} variant="h4">
        Pet Type
      </Typography>
      <FormGroup row>
        <FormControlLabel
          className={classes.firstColumnFormControlLabel}
          control={<Checkbox name="checkedA" color="primary" />}
          label="Dog"
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" />}
          label="Cat"
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" />}
          label="Rabbit"
        />
        <FormControlLabel
          className={classes.firstColumnFormControlLabel}
          control={<Checkbox name="checkedA" color="primary" />}
          label="Bird"
        />
        <FormControlLabel
          //   className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" />}
          label="Hamster"
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" />}
          label="Turtle"
        />
      </FormGroup>
      <Button className={classes.sideButton} variant="contained" onClick={searchHandle}>
        Search
      </Button>
    </div>
  );
};

export default SideSearchBox;
