import React from "react";
import Header from "../Header/header";
import SideSearchBox from "./SideSearchBox";
import Results from "./Results/Results";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";

const SearchResult = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <div>
      <Header />
      <div className={classes.searchResult}>
        <SideSearchBox />
        <Results />
      </div>
    </div>
  );
};

export default SearchResult;
