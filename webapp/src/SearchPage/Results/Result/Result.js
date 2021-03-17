import React from "react";
import { Card } from "@material-ui/core";
import useStyles from "./styles";

const Result = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Card className={classes.root}>
        <h4>result</h4>
      </Card>
    </div>
  );
};

export default Result;
