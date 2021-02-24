import React, { useState } from "react";
import Pet from "./Pet";
import AddPet from "./AddPet";
import AddButton2 from "./AddButton2";

function SumPet({pet_lists,deletePet}) {
   
    console.log("choichoi");
    return (
        <div className="sumpet">
            {/*Pet lists*/}
          { /* */} 
          {pet_lists.map((pet) => (
        <Pet info={pet} deletePet={deletePet} />
    ))} 
            

        </div>
    )
}

export default SumPet;