import React from "react";
import Result from "./Result/Result";
import useStyles from "./styles";

const Results = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <div className={classes.root}>
      {Object.entries(props.state).map((userInfo, index) => (
        <Result userInfo={userInfo} index={index} />
      ))}
    </div>
  );
};

export default Results;
