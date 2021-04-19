import React from "react";
import Header from "../Header/header";
import useStyles from "./styles";
import SearchBox from "./SearchBox";

const SearchPage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <div className="search__page">
      <Header />
      <div className={classes.searchPage}>
        <div style={{ height: "150px" }}></div>

        <div className={classes.searchBox1}>
          <SearchBox />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
