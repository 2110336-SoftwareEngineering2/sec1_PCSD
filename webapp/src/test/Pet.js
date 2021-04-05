import React from 'react'
import "./Pet.css";
import {Avatar} from "@material-ui/core";
function Pet({info}) {
    return (
        <div className="tpet">
       <Avatar className="tPet__image" src={info.imgURL} />
        <div className="col-12">
          <div className="tPet__name">
            {info.petName}, &nbsp;{info.age}, &nbsp;({info.gender})  <br></br><div className="breed">{info.breed}</div>
          </div>
        </div>
      </div>
    )
}

export default Pet
