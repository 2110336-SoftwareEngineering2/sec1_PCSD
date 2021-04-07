import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    fontFamily: "",
    width: "100%",
    minheight: "240px",
    borderRadius: "5px",
    backgroundColor: "white",
    display: "flex",
  },
  profile: {
    width: "27%",
    height: "220px"
    // backgroundColor: "red",
  },
  media: {
    width: "74%",
    height: "74%",
    margin: "13%",
  },
  info: {
    width: "55%",
    // backgroundColor: "blue",
    padding : "0px 0px 30px 0px",
  },
  nameSection: {
    padding: "20px 0 0 0",
    margin: "10px 0 0 0px",
    fontSize: "36px",
    fontWeight: "bold",

  },
  name: {
    color: "#BD6A43",
  },
  description: {
    marginTop: "10px",
    lineHeight: "0.7",
    lineHeightStep: "0.3"
  },
  rating: {
    lineHeight: "0.8",
    fontSize: "16px",
    fontFamily: "Algerian",
  },
  star: {
    marginTop: "8px",
    "& .MuiRating-iconFilled": {
      color: "black",
    },margin: "0px",
    marginBottom: "18px",
  },
  priceSection: {
    width: "18%",
    textAlign: "center",
    padding: "80px 0px",
    // backgroundColor: "yellow",
  },
  h6: {
    lineHeight: "0.9",
  },
  price: {
    lineHeight: "0.7",
    marginBottom: "5px",
    color: "#BD6A43",
    fontWeight: "bold",
  },
  
}));
