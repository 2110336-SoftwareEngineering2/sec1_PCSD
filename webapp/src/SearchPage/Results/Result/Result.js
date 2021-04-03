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
            <span className={classes.name}>{props.user.firstname+' '+props.user.lastname}</span>
          </Typography>
          <Typography className={classes.description} variant="h5">
            Love dog love num love pla love sakura
          </Typography>
          <Typography className={classes.address} variant="h6">
            Rama 9, Bangkok, 10500
          </Typography>
          <Rating
            className={classes.star}
            name="read-only"
            value={4.5}
            precision={0.5}
            readOnly
          />
          <Typography className={classes.rating} variant="h6">
            Review 4.5/5 (7){" "}
          </Typography>
        </div>
        <div className={classes.priceSection}>
          <h6 className={classes.h6}>from</h6>
          <Typography className={classes.price} variant="h6">
            325 Baht
          </Typography>
          <h6 className={classes.h6}>per day</h6>
        </div>
      </Card>
      <hr />
    </div>
  );
};

export default Result;
