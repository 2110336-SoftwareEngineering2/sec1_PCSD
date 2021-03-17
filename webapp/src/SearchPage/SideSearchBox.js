import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import useStyles from "./styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const SideSearchBox = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    checkedDog: false,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
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
        >
          <option>House Siting</option>
          <option>Boarding</option>
          <option>Day Care</option>
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
      />
      <Typography className={classes.header} variant="h4">
        Rate
      </Typography>
      <div className={classes.sidePriceSection}>
        <TextField
          className={classes.sidePriceInput}
          variant="outlined"
          size="small"
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
        />
      </div>
      <Typography className={classes.header} variant="h4">
        Date
      </Typography>
      <div className={classes.sidePriceSection}>
        <TextField
          className={classes.sideDateInput}
          InputProps={{
            classes: {
              input: classes.datePlaceHolder,
            },
          }}
          type="date"
          variant="outlined"
          size="small"
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
          InputProps={{
            classes: {
              input: classes.datePlaceHolder,
            },
          }}
          type="date"
          variant="outlined"
          size="small"
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
      <Button className={classes.sideButton} variant="contained">
        Search
      </Button>
    </div>
  );
};

export default SideSearchBox;
