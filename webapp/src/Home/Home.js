import React, { useContext, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { UserContext } from "../context/MyContext";
import Header from "./../Header/header";
import "./Home.css";
import background from "./bg.jpg";
import SearchBox from "./../SearchPage/SearchBox";
import { useCookies } from "react-cookie";
import gif from "./petgif.gif";
import gif2 from "./petgif2.gif";
import gif3 from "./petgif3.gif";
function Home() {
  const { user } = useContext(UserContext);
  const userContext = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (cookie.accessToken !== undefined) {
      axios
        .post("http://localhost:4000/auth/valid", {}, {
          headers: {
            "authorization": "Bearer " + cookie.accessToken
          }
        })
        .then((res) => {
          axios
            .post("http://localhost:4000/user/email", {email: (res.data).email})
            .then((res) => {
              userContext.login({...res.data, accessToken: cookie.accessToken});
            })
        })
        .catch((err) => {
          console.log(err);
          removeCookie("accessToken", {path: "/"});
        });
    }
  }, []);

  return (
    <div className="home" style={{ 
      backgroundImage: `url(${background})`
    }}>
        {userContext.user ? <Header /> : null}
        <p> Online Matchmaking Loving Pet Care </p>
<h2> Book trusted caretakers who’ll treat 
your pets like family.</h2>
        <SearchBox />
        <img src={gif} />
        <img id="gif2" src={gif2} /> 
        <img id="gif3" src={gif3} /> 
    </div>

  );
}

export default Home;

