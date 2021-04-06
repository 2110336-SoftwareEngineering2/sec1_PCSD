import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { UserContext } from "../context/MyContext";
import Header from "./../Header/header";
import "./Home.css";
import background from "./bg.jpg";
import SearchBox from "./../SearchPage/SearchBox";
import { useCookies } from "react-cookie";
import NightsStayIcon from "@material-ui/icons/NightsStay";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import LocalAirportIcon from "@material-ui/icons/LocalAirport";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import PetsIcon from "@material-ui/icons/Pets";
import SearchIcon from "@material-ui/icons/Search";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import HotelIcon from "@material-ui/icons/Hotel";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import RepeatIcon from "@material-ui/icons/Repeat";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
function Home() {
  const { user } = useContext(UserContext);
  const userContext = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (cookie.accessToken !== undefined) {
      axios
        .post(
          "http://localhost:4000/auth/valid",
          {},
          {
            headers: {
              authorization: "Bearer " + cookie.accessToken,
            },
          }
        )
        .then((res) => {
          axios
            .post("http://localhost:4000/user/email", { email: res.data.email })
            .then((res) => {
              userContext.login({
                ...res.data,
                accessToken: cookie.accessToken,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          removeCookie("accessToken", { path: "/" });
        });
    }
  }, []);

  return (
    <div className="home">
      {userContext.user ? <Header /> : null}
      <div
        className="top"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="row">
          <Col xs="12">
            <p> Online Matchmaking Loving Pet Care </p>

            <h2>
              {" "}
              Book trusted caretakers who’ll treat your pets like family.
            </h2>
            <SearchBox />
          </Col>
        </div>
      </div>
      <div className="center">
        <br></br>
        <div className="row">
          <Col xs="12">
            <h2 className="section-header"> Services for every pet</h2>
          </Col>
        </div>
        <div className="row">
          <Col xs="12" sm="6">
            <div className="Service-row">
              <NightsStayIcon />
              <div className="Description">
                <span className="title">House Sitting</span>
                <div className="content">
                  Great if you need overnight pet or house-sitting services.
                </div>
              </div>
            </div>
            <div className="Service-row">
              <LocalAirportIcon />
              <div className="Description">
                <span className="title">Boarding</span>
                <div className="content">
                  Perfect if you need overnight pet care.
                </div>
              </div>
            </div>
            <div className="Service-row">
              <WbSunnyIcon />
              <div className="Description">
                <span className="title">Day Care</span>
                <div className="content">
                  Daytime pet care in your sitter’s pet-friendly home.
                </div>
              </div>
            </div>
          </Col>
          <Col xs="12" sm="6">
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://picsum.photos/id/222/200/100/?blur=2"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Book with caretakers you can trust</h3>
                  <p>All new caretakers pass a basic background check.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://picsum.photos/id/241/200/100/?blur=2"
                  alt="Second slide"
                />

                <Carousel.Caption>
                  <h3>Book with pet sitters you can trust</h3>
                  <p>
                    All sitters provide a detailed profile and personal
                    information.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://picsum.photos/id/234/200/100/?blur=2"
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Book with pet sitters you can trust</h3>
                  <p>
                    All sitters are approved by our team of sitter specialists.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </div>
      </div>
      <div className="bottom">
        <div className="row">
          <Col xs="12">
            <h3 className="section-header">
              We’re the treat-your-dog-like-family dog people
            </h3>
          </Col>
        </div>
        <div className="row">
          <Timeline align="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot>
                  <SearchIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className="paper s">
                  <Typography variant="h6" component="h1">
                    Search
                  </Typography>
                  <Typography>
                    Read verified reviews and pick the perfect caretaker
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="primary">
                  <PetsIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className="paper r">
                  <Typography variant="h6" component="h1">
                    Reserve & pay on Petidcare
                  </Typography>
                  <Typography>
                    Book and pay securely through the website or app
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="secondary">
                  <FlightTakeoffIcon />
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent>
                <Paper elevation={3} className="paper re">
                  <Typography variant="h6" component="h1">
                    Relex
                  </Typography>
                  <Typography>
                    Get the Petidcare Guarantee, 24/7 support,
                    <br></br> and reservation protection
                  </Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </div>
  );
}

export default Home;
