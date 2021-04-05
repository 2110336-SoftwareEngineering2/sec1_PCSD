import React from 'react'
import "./Pet.css";
import {Avatar} from "@material-ui/core";
function Pet({info}) {
    return (
        <div className="tpet">
       <Avatar className="tPet__image" src={info.imgURL} />
        <div className="col-5">
          <div className="tPet__name">
            {info.petName}, {info.age}, {info.gender}{" "}
          </div>
        </div>
      </div>
    )
}

export default Pet
