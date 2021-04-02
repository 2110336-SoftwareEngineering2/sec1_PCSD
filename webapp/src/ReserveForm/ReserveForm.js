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
import { useCookies } from "react-cookie";

function ReserveForm( {name}) {
    const { user } = useContext(UserContext);
    const classes = useStyles();
    const [value, setValue] = useState(0);
    // const [selectedDate, handleDateChange] = useState(new Date());
    const [pet_lists, setPetlists] = useState([]);

    const [cookie, setCookie, removeCookie] = useCookies();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    // const [service, setService] = useState("");

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
  function onClick() {
    const reserveTmp = cookie.reserveTmp;
    const selectedPets = cookie.selectedPets;
    // console.log(reserveTmp)
    // console.log(selectedPets)
    var reserveData = {
      caretaker: reserveTmp.caretaker,
      petowner: reserveTmp.petowner,
      pets: selectedPets,
      rate: reserveTmp.rate.rate,
      status: 0,
      startDate: startDate,
      endDate: endDate,
      service: serviceString(value)
    }
    // console.log(reserveData)
    // console.log(cookie.accessToken)
    axios.post(`http://localhost:4000/reserve/caretaker`, reserveData, {
      headers: {
        "authorization": cookie.accessToken
      }
    }).then((res) => {
      console.log(res)
      history.push({ pathname: "/payment" });
    }).catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    // console.log(pet_lists)
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
  

  function serviceString(num) {
    switch (num) {
      case 0:
        return "House Sitting";
      case 1:
        return "Boarding"
      default:
        return "Day Care";
    }
  }
  function onChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
  }

  function onChangeService(event) {
    const service = event.target.label;
    console.log(service)
  }

  function onChangeStartDate(event) {
    // setStartDate(Date(event.target.value));
    var dateString = event.target.value;
    dateString = dateString.replace('T', ' ')
    setStartDate(dateString)
  }

  function onChangeEndDate(event) {
    var dateString = event.target.value;
    dateString = dateString.replace('T', ' ');
    setEndDate(dateString);
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
   /* axios.delete("http://localhost:4000/user/pet", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
      data: {
        source: petId
      }
    }).then((res) => {
      console.log(res.data);
      setPetlists(pet_lists.filter((pet) => pet._id == petId));
    }).catch((err) => console.log(err));  */
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
              defaultValue="2021-01-01T10:30"
              onChange={onChangeStartDate}
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
              defaultValue="2021-01-01T10:30"
              className={classes.textField}
              onChange={onChangeEndDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </form>
          <SumPet pet_lists={pet_lists} CheckPet={CheckPet} />
          <button
            className="Reserve__Button"
            onClick={onClick}
          >
            Reserve
          </button>
        </div>
    )
}

export default ReserveForm;
