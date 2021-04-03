import React from "react";
import Header from "../Header/header";
import SideSearchBox from "./SideSearchBox";
import Results from "./Results/Results";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";

const SearchResult = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState(props.location.state);
  return (
    <div>
      <Header />
      <div className={classes.searchResult}>
        <SideSearchBox data={props.location.data} setState={setState} />
        <Results state={state} />
      </div>
    </div>
  );
};

export default SearchResult;
