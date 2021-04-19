import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Pet.css";
import { useCookies } from "react-cookie";
import {Avatar} from "@material-ui/core";
function Pet({ info, CheckPet }) {
  const [click, setClick] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    setCookie("selectedPets", [], {path: "/"});
  }, []);

  function onClicked() {
    setClick(!click);
    CheckPet(info._id);
    var selectedPets = cookie.selectedPets;
    if (!click) {
      setCookie("selectedPets", [...selectedPets, info], {path: "/"});
    } else {
      var filtered = selectedPets.filter((value, idx, arr) => {
        return value.petName !== info.petName;
      });
      setCookie("selectedPets", filtered, {path: "/"});
    }
  }
  let btn_class = click ? "clickedButton" : "unclickedButton";
  return (
    <div className="Rpet">
      <Avatar className="RPet__image" src={info.imgURL} />
      <div className="col-5">
        <div className="RPet__name">
          {info.petName}, {info.age}, {info.gender}{" "}
        </div>
      </div>
      <button className={btn_class} onClick={onClicked}>
        ✓
      </button>
    </div>
  );
}

export default Pet;
