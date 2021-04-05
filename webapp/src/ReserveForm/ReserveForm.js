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

function ReserveForm(props) {
    const { user } = useContext(UserContext);
    const caretaker = props.location.state.caretaker;
    const classes = useStyles();
    const [value, setValue] = useState(0);
    // const [selectedDate, handleDateChange] = useState(new Date());
    const [pet_lists, setPetlists] = useState([]);

    const [cookie, setCookie, removeCookie] = useCookies();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [lname, setLname] = useState("");
    const [fname, setFname] = useState("");
    // const [service, setService] = useState("");
    axios.post("http://localhost:4000/user/email", {email: caretaker})
    .then((res) => {
      const data = res.data;
      setFname(data.firstname);
      setLname(data.lastname);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    })
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
    if (startDate === "" || endDate === "") {
      // console.log("please select date");
      window.alert("Please select date");
      return;
    }
    console.log(reserveTmp);
    try {
      const rate = reserveTmp.rate; 
      console.log(rate)
      var reserveData = {
        caretaker: reserveTmp.caretaker,
        petowner: reserveTmp.petowner,
        pets: selectedPets,
        rate: rate,
        startDate: startDate,
        endDate: endDate,
        service: serviceString(value)
      }

      setCookie("reserveTmp", reserveData, { path: "/" });
      history.push({pathname: "/payment", reserve: cookie.reserveTmp});
    } catch (err) {
      window.alert("Please select caretaker again");
      history.push({pathname: "/"});
    }
    // console.log(reserveData)
    // console.log(cookie.accessToken)
    // axios.post(`http://localhost:4000/reserve/caretaker`, reserveData, {
    //   headers: {
    //     "authorization": cookie.accessToken
    //   }
    // }).then((res) => {
    //   console.log(res)
    //   history.push({ pathname: "/payment", reserve: res.data});
    // }).catch(err => {
    //   console.log("whatttttt");
    //   console.log(err);
    // })

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

  function onChangeService(event) {
    const service = event.target.label;
    console.log(service)
  }

  const dateStringToTimeStamp = (date) => {
    // var x = date.replace(' ', 'T');
    date += ':00Z';
    var d = new Date(date);
    return d.getTime();
  }

  function onChangeStartDate(event) {
    // setStartDate(Date(event.target.value));
    var dateString = event.target.value;
    // dateString = dateString.replace('T', ' ')
    var timestamp = dateStringToTimeStamp(dateString);
    setStartDate(timestamp)
  }

  function onChangeEndDate(event) {
    var dateString = event.target.value;
    // dateString = dateString.replace('T', ' ');
    var timestamp = dateStringToTimeStamp(dateString);
    setEndDate(timestamp);
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
        <div className="ReserveForm" id="ReserveForm">
          <Header />
          <br></br>
          <br></br>
          <div className="col-12" id="Form1">
          <h2 className={classes.h2}>Reserve {fname} {lname}</h2>
          </div>
          <div className="col-12" id="Form">
        <div className={classes.serviceTypeBoxx}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
          >
            <BottomNavigationAction
              className={classes.serviceBoxx}
              label="House Sitting"
              icon={<NightsStayIcon />}
            />
            <BottomNavigationAction
              className={classes.serviceBoxx}
              label="Boarding"
              icon={<LocalAirportIcon />}
            />
            <BottomNavigationAction
              className={classes.serviceBoxx}
              label="Day Care"
              icon={<WbSunnyIcon />}
            />
          </BottomNavigation>
          </div>
          <form className={classes.container} id="datetimepicker" noValidate>
            <TextField
              id="datetime-local"
              label="When would you like to drop off?"
              type="datetime-local"
              defaultValue="2021-04-01T10:30"
              onChange={onChangeStartDate}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TextField
              id="datetime-local"
              label="When would you like to pick up?"
              type="datetime-local"
              defaultValue="2021-04-01T10:30"
              className={classes.textField}
              onChange={onChangeEndDate}
              InputLabelProps={{
                shrink: true,
              }}
            />

          </form>
          <h3>Pets</h3>
          <SumPet pet_lists={pet_lists} CheckPet={CheckPet} />
          <button
            className="Reserve__Button"
            onClick={onClick}
          >
            Reserve
          </button>
          </div>
          <footer>
            <div className="footer">
              <p>Powered by P.C.S.D.</p>
            </div>
          </footer>
        </div>
    )
}

export default ReserveForm;
