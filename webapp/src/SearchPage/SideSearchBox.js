import React, { useEffect } from "react";
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
  const [value, setValue] = React.useState(props.data.value);
  const [pet_type, setPetType] = React.useState(props.data.pet_type ? {
    dog: props.data.pet_type.find(petType => petType == "dog") ? true : false,
    cat: props.data.pet_type.find(petType => petType == "cat") ? true : false,
    rabbit: props.data.pet_type.find(petType => petType == "rabbit") ? true : false,
    bird: props.data.pet_type.find(petType => petType == "bird") ? true : false,
    hamster: props.data.pet_type.find(petType => petType == "hamster") ? true : false,
    turtle: props.data.pet_type.find(petType => petType == "turtle") ? true : false
  } : {
    dog: false,
    cat: false,
    rabbit: false,
    bird: false,
    hamster: false,
    turtle: false,
  })

  useEffect(() => {
    const petChecker = document.getElementsByName("checkedA");

    if(props.data.pet_type) {
      for(var i=0; i<petChecker.length; i++) {
        const found = props.data.pet_type.find(petType => petType == petChecker[i].value)
        console.log(petChecker[i].value+" "+found)
        if(found != undefined) {
          petChecker[i].checked = true;
        }
      }
    }
  }, [])

  const onChange = (event) => {
    setValue({...value, [event.target.name]: event.target.value})
  }
  
  const getSearchData = () => {
    const minmax = [parseInt((value.minrate != "" ? value.minrate : 0)), parseInt((value.maxrate != "" ? value.maxrate : 0))];
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
      props.setState(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const changePetType = (event) => {
    setPetType({...pet_type, [event.target.value]: !pet_type[event.target.value]})
  }

  const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
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

  const resetHandle = () => {
    setValue({
      minrate: "",
      maxrate: "",
      type: "",
      date: {
        start: "",
        end: ""
      },
      address: "",
    })
    setPetType({
      dog: false,
      cat: false,
      rabbit: false,
      bird: false,
      hamster: false,
      turtle: false,
    })
  }

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
          control={<Checkbox name="checkedA" color="primary" value="dog" checked={pet_type.dog} onChange={changePetType} />}
          label="Dog"
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" value="cat" checked={pet_type.cat} onChange={changePetType} />}
          label="Cat"
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" value="rabbit" checked={pet_type.rabbit} onChange={changePetType} />}
          label="Rabbit"
        />
        <FormControlLabel
          className={classes.firstColumnFormControlLabel}
          control={<Checkbox name="checkedA" color="primary" value="bird" checked={pet_type.bird} onChange={changePetType} />}
          label="Bird"
        />
        <FormControlLabel
          //   className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" value="hamster" checked={pet_type.hamster} onChange={changePetType} />}
          label="Hamster"
        />
        <FormControlLabel
          className={classes.formControlLabel}
          control={<Checkbox name="checkedA" color="primary" value="turtle" checked={pet_type.turtle} onChange={changePetType} />}
          label="Turtle"
        />
      </FormGroup>
      <Button className={classes.sideButton} variant="contained" onClick={searchHandle}>
        Search
      </Button>
      <Button className={classes.sideButton} variant="contained" onClick={resetHandle}>
        Reset
      </Button>
    </div>
  );
};

export default SideSearchBox;
