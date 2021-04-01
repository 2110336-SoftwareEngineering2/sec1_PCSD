import React, {useContext, useState, useEffect, useRef} from 'react';
import axios, { CancelToken }  from "axios";
import Header from '../Header/header';
import { UserContext } from "../context/MyContext";
import "./ReserveForm.css";
import {
    Button,
    BottomNavigation,
    BottomNavigationAction,
    TextField,
  } from "@material-ui/core";
import history from "./../history";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import useStyles from "./styles";
import SumPet from './SumPet';
import image from "./../userpic.png";
function ReserveForm( {name}) {
    const { user } = useContext(UserContext);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [pet_lists, setPetlists] = useState([]);

  const componentIsMounted = useRef(true);
  // 0: AddPetForm, 1: AddButtonClicked, 2: SumPet
  const [pageState, setPageState] = useState(1);
  const [input, setInput] = useState({
    petType: "",
    petName: "",
    breed: "",
    age: "",
    gender: "",
    petImg: image,
  });
  
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const cancelTokenSource = CancelToken.source();
    try {
      if (pageState === 1) {
        axios.get("http://localhost:4000/user/pet", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          if (componentIsMounted.current) {
            setPageState(2);
            setPetlists(res.data);
          }
        })
        .catch((err) => {
          if (componentIsMounted.current) {
            setPageState(0);
          }
          console.log(err)
        } );
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return console.info(err);
      }
      console.error(err);
    }
    return () => {
      // here we cancel preveous http request that did not complete yet
      cancelTokenSource.cancel(
        "Cancelling previous http call because a new one was made ;-)"
      );
    };
  }, [pageState, pet_lists]);
  

  function onChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function clickedAdd() {
    if (pageState === 2) {
      setPageState(0);
    } else {
      const newPet = {
        petName: input.petName,
        breed: input.breed,
        age: input.age,
        gender: input.gender,
      };
      axios
      .post("http://localhost:4000/user/pet", newPet, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        uploadPetPic(res.data);
        setPageState(1);
      })
      .catch((err) => console.log(err));
    }
  }

  function uploadPetPic(pet) {
    const data = new FormData();
    data.append("email", pet.owner + pet._id);
    data.append("file", input.petImg);
    console.log(data);
    axios
      .post("http://localhost:4000/user/profilepic", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }


  function CheckPet(petId) {
    /*axios.delete("http://localhost:4000/user/pet", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
      data: {
        source: petId
      }
    }).then((res) => {
      console.log(res.data);
      setPetlists(pet_lists.filter((pet) => pet._id !== petId));
    }).catch((err) => console.log(err)); */
  }
    return (
        <div className="ReserveForm">
          <Header />
          <br></br>
          <br></br>
            <div className={classes.serviceTypeBoxx}>
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
          <form className={classes.container} id="datetimepicker" noValidate>
            <TextField
              id="datetime-local"
              label="From"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp;  &nbsp;
            <TextField
              id="datetime-local"
              label="To"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <SumPet pet_lists={pet_lists} CheckPet={CheckPet} />
          <button
            className="Reserve__Button"
            onClick={() => {
              history.push({ pathname: "/payment" });
            }}
          >
            Reserve
          </button>
        </div>
    )
}

export default ReserveForm;
