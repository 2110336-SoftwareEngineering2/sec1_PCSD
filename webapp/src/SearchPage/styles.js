import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  label: {
    margin: "5px 5px 5px 20px",
  },
  h2: {
    margin: "10px 0px 10px 20px",
  },
  searchBox: {
    backgroundColor: "white",
    justifyContent: "center",
    // position: "relative",
    // top: "130px",
    // left: "20%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "350px",
    width: "850px",
    borderRadius: "10px",
    boxShadow: "0px 5px 8px -9px rgba(0, 0, 0, 0.75)",
  },
  animalType: {
    padding: "2%",
    width: "100%",
    height: "18%",
    backgroundColor: "#9d7f70",
    display: "inline-flex",
    borderRadius: "10px 10px 0 0",
    color: "white",
  },
  searchPage: {
    height: "660px",
    backgroundColor: "#F1F1F1",
    position: "relative",
  },
  button: {
    backgroundColor: "#bd6a43",
    width: "25%",
    color: "white",
    position: "relative",
    top: "0%",
    left: "37.5%",
    fontSize: "20px",
  },

  upperSection: {
    height: "40%",
    display: "flex",
  },
  serviceTypeBox: {
    width: "60%",
  },
  serviceBox: {
    border: "1px solid grey",
    marginLeft: "5px",
    fontSize: "16px",
    borderRadius: "10px",
    width: "28%",
    "& .MuiBottomNavigationAction-iconOnly": {
      color: "red",
    },
    "& .Mui-selected": {
      // color: "#BD6A43",
      fontSize: "18px",
      iconColor: "#BD6A43",
    },
    "& .MuiBottomNavigationAction-root": {
      color: "red",
    },
  },
  priceBox: {
    width: "40%",
  },
  priceBoxLine2: {
    display: "flex",
    margin: "5% 0 0 7%",
  },
  priceInput: {
    width: "25%",
    fontSize: "10px",
    marginLeft: "5%",
  },
  lowerSection: {
    display: "flex",
    height: "36%",
  },
  cityBox: {
    width: "35%",
  },
  dateBox: {
    width: "65%",
  },
  cityInput: {
    marginLeft: "13%",
    width: "230px",
  },
  dateBoxLine2: {
    display: "flex",
    margin: "0 0 0 5%",
  },
  dateInput: {
    marginLeft: "3%",
    width: "40%",
    transparent: "0%",
  },
  searchResult: {
    // backgroundColor: "yellow",
    backgroundColor: "#F1F1F1",
    hegith: "100%",
    display: "flex",
  },

  sideSearchBox: {
    margin: "10px",
    width: "350px",
    height: "630px",
    position: "sticky",
    top: "40px",
    backgroundColor: "white",
  },
  paper: {
    backgroundColor: "white",
    "& > *": {
      borderRadius: "5px",
      backgroundColor: "white",
      width: "100%",
      height: "100%",
    },
  },
  header: {
    margin: "10px",
  },
  formControl: {
    width: "250px",
    marginLeft: "10px",
  },
  formControlLabel: {
    marginRight: "47px",
  },
  firstColumnFormControlLabel: {
    marginRight: "47px",
    marginLeft: "10px",
  },
  sideButton: {
    backgroundColor: "#bd6a43",
    color: "white",
    fontSize: "20px",
    margin: "10px 0 50px 100px",
  },
  sideCityInput: {
    width: "270px",
    marginLeft: "10px",
  },

  sidePriceSection: {
    display: "flex",
    marginLeft: "10px",
  },
  sidePriceInput: {
    width: "108px",
  },
  sideDateInput: {
    width: "150px",
  },
  datePlaceHolder: {
    fontSize: "12px",
    opacity: "0.5",
  },
}));
