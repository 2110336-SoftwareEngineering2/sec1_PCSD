import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./../Header/header";
import "./Home.css";
import background from "./bg.jpg";
import SearchBox from "./../SearchPage/SearchBox";
function Home() {
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

