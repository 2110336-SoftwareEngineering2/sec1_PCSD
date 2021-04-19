import React from "react";
import Pet from "./Pet";
import "./Sumpet.css";
function SumPet({pet_lists, CheckPet}) {
    return (
        <div className="Rsumpet">
            {pet_lists.map((pet) => (
            <Pet info={pet} CheckPet={CheckPet} />
            ))} 
        </div>
  
    )
}

export default SumPet;