import React from "react";
import Result from "./Result/Result";
import useStyles from "./styles";

const Results = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div className={classes.root}>
      <Result />
      <Result />
      <Result />
      <Result />
      <Result />
      <Result />
    </div>
  );
};

export default Results;
