import React, { useState } from "react";
import Pet from "./Pet";
import "./Sumpet.css";
function SumPet({pet_lists, deletePet}) {

    return (
        <div className="sumpet">
            {pet_lists.map((pet) => (
            <Pet info={pet} deletePet={deletePet} />
            ))} 
        </div>
  
    )
}

export default SumPet;