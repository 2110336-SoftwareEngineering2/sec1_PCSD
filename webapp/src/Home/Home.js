import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UserContext } from "../context/MyContext";
import Header from "./../Header/header";
import "./Home.css";
import background from "./bg.jpg";
import SearchBox from "./../SearchPage/SearchBox";

function Home() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/user?email=${user.email}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  },[]);

  return (
    <div className="home" style={{ 
      backgroundImage: `url(${background})`
    }}>
        <Header />
        <p> Online Matchmaking Loving Pet Care </p>
<h2> Book trusted caretakers who’ll treat 
your pets like family.</h2>
        <SearchBox />
    </div>

  );
}

export default Home;

