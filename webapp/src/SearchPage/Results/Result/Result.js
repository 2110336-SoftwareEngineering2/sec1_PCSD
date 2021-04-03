import React from "react";
import { Card, CardMedia, Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import history from "./../../../history";
import useStyles from "./styles";
import axios from "axios";
const Result = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const onClick = () => {
    console.log(props.userInfo);
    axios.post("http://localhost:4000/user/caretaker/find", {caretaker: props.userInfo.caretaker.caretaker})
    .then((res) => {
      history.push( {pathname: "/reservepage", state: res.data});
    })
    .catch((err) => {
      console.log(err);
    })
  };

  return (
    <div>
      <Card
        className={classes.root}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <div className={classes.profile}>
          <img
            className={classes.media}
            src={"https://pcsdimage.s3-us-west-1.amazonaws.com/"+ props.userInfo.caretaker.caretaker}
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
          <Typography className={classes.description} variant="h5">
            {props.userInfo.caretaker.description}
          </Typography>
          <Typography className={classes.address} variant="h6">
            {[
              props.userInfo.caretaker.province,
              props.userInfo.caretaker.city,
              props.userInfo.caretaker.country,
            ].join(", ")}
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
              Review {props.userInfo.rate_point_av}/5 (
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
            {props.userInfo.caretaker.rate.$numberDecimal}
          </Typography>
          <h6 className={classes.h6}>per day</h6>
        </div>
      </Card>
      <hr />
    </div>
  );
};

export default Result;
