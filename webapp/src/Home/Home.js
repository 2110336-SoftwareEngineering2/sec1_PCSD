import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./../Header/header";
function Home() {
  return (
    <div className="home">
        <p>This is HomePage</p>
        <Header />
    </div>

  );
}

export default Home;

