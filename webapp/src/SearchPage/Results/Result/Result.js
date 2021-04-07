import React, { useState } from "react";
import { Card, CardMedia, Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import history from "./../../../history";
import useStyles from "./styles";
import axios from "axios";
const Result = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [pic, setPic] = useState("");
  console.log(props);
  const onClick = () => {
    console.log(props.userInfo);
    axios
      .post("http://localhost:4000/user/caretaker/find", {
        caretaker: props.userInfo.caretaker.caretaker,
      })
      .then((res) => {
        history.push({ pathname: "/reservepage", state: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getPic = (email) => {
    axios
    .post("http://localhost:4000/user/email", {email: email})
    .then((res) => {
      setPic(res.data.imgURL);
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });

  return (
    <div>
      <Card
        className={classes.root}
        onClick={onClick}
        style={{ cursor: "pointer" }}
        classes={{ root: state.raised ? classes.cardHovered : "" }}
        onMouseOver={() => setState({ raised: true, shadow: 3 })}
        onMouseOut={() => setState({ raised: false, shadow: 1 })}
        raised={state.raised}
        zdepth={state.shadow}
      >
        <div className={classes.profile}>
        { getPic(props.userInfo.caretaker.caretaker)}
        <img
          className={classes.media}
              src={pic}
      />
        </div>
        <div className={classes.info}>
          <Typography className={classes.nameSection} variant="h4">
            {/* 1. */}
            <span className={classes.name}>
              {[
                props.userInfo.user.firstname,
                props.userInfo.user.lastname,
              ].join(" ")}
            </span>
          </Typography>

          <Typography
            className={classes.description}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {props.userInfo.caretaker.description}
          </Typography>

          <Typography
            className={classes.address}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {[
              props.userInfo.caretaker.province,
              props.userInfo.caretaker.city,
              props.userInfo.caretaker.country,
            ].join(", ")}{" "}
          </Typography>

          <Rating
            className={classes.star}
            name="read-only"
            value={props.userInfo.caretaker.rate_point.sum_rate.$numberDecimal}
            precision={0.5}
            readOnly
          />
          {props.userInfo.rate_point_av >= 0 ? (
            <Typography className={classes.rating} variant="h6">
              Review {Math.round(props.userInfo.rate_point_av*100)/100}/5 (
              {props.userInfo.caretaker.rate_point.rate_count}){" "}
            </Typography>
          ) : (
            <Typography className={classes.rating} variant="h6">
              No rating{" "}
            </Typography>
          )}
        </div>
        <div className={classes.priceSection}>
          <h6 className={classes.h6}>from</h6>
          <Typography className={classes.price} variant="h6">
            &#3647;{props.userInfo.caretaker.rate.$numberDecimal}
          </Typography>
          <h6 className={classes.h6}>per hour</h6>
        </div>
      </Card>
      <hr />
    </div>
  );
};

export default Result;
