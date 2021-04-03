import React from "react";
import { Card, CardMedia, Typography, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

const Result = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.profile}>
          <img
            className={classes.media}
            src={
              "https://i0.wp.com/popdose.com/wp-content/uploads/hide-the-pain-harold-trying-to-smile-meme-mobile-wallpaper-800x1280-20331-1387213964.jpg?ssl=1"
            }
          />
        </div>
        <div className={classes.info}>
          <Typography className={classes.nameSection} variant="h4">
            {/* 1. */}
            <span className={classes.name}>{[props.userInfo.user.firstname,props.userInfo.user.lastname].join(' ')}</span>
          </Typography>
          <Typography className={classes.description} variant="h5">
            {props.userInfo.caretaker.description}
          </Typography>
          <Typography className={classes.address} variant="h6">
            {[props.userInfo.caretaker.province,props.userInfo.caretaker.city,props.userInfo.caretaker.country].join(", ")}
          </Typography>
          <Rating
            className={classes.star}
            name="read-only"
            value={props.userInfo.caretaker.rate_point.sum_rate.$numberDecimal}
            precision={0.5}
            readOnly
          />
          <Typography className={classes.rating} variant="h6">
            Review {props.userInfo.caretaker.rate_point.sum_rate.$numberDecimal}/5 ({props.userInfo.caretaker.rate_point.rate_count}){" "}
          </Typography>
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
