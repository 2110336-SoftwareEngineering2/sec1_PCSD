import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./../Header/header";
import "./Home.css";
import background from "./bg.jpg";
function Home() {
  return (
    <div className="home" style={{ 
      backgroundImage: `url(${background})`
    }}>
        <Header />
    </div>

  );
}

export default Home;

