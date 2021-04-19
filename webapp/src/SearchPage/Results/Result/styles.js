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
    
    height: "220px",
    width: "24%",
    // backgroundColor: "red",
  },
  media: {
    width: "83%",
    height: "83%",
    margin: "10%",
  },
  info: {
    marginLeft: "2%",
    width: "56%",
    // backgroundColor: "blue",
    padding : "0px 0px 30px 0px",
  },
  nameSection: {
    padding: "20px 0 0 0",
    margin: "10px 0 0 7px",
    fontSize: "36px",
    fontWeight: "bold",
    lineHeight: "1",
  },
  name: {
    color: "#872935",
  },
  description: {
    lineHeight: "0.7",
    lineHeightStep: "0.3",
    marginTop: "5px",
    marginLeft: "7px",
    lineHeight: "1",
  },
  address: {
    marginLeft: "7px",
  },
  rating: {
    lineHeight: "0.8",
    fontSize: "16px",
    marginLeft: "7px",
    fontFamily: "Algerian",
  },
  star: {
    // border: "1px solid red",
    padding: "0px",
    marginLeft: "0px",
    marginTop: "8px",
    "& .MuiRating-iconFilled": {
      color: "#b1767d",
    },
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
