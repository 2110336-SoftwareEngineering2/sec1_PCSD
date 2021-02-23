import React, { useState } from "react";
import Pet from "./Pet";
import AddPet from "./AddPet";
import AddButton2 from "./AddButton2";

function SumPet({pet_lists, id}) {

    function deletePet({id}) {
        const updatedLists = pet_lists.filter((pet) => pet.id !== id);
        pet_lists = updatedLists;
    }
    return (
        <div className="sumpet">
            {/*Pet lists*/}
          { /* {pet_lists.map((pet) => (
        <Pet key={pet.id} id={pet.id} name={pet.name} deletePet={deletePet} />
    ))} */}
    <Pet id={13} name={"choi"} deletePet={deletePet} />
            

        </div>
    )
}

export default SumPet;