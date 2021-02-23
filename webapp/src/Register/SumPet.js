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
            <p>this pet</p>
            {/*Pet lists*/}
            {pet_lists.map((pet) => (
        <Pet key={pet.id} id={pet.id} name={pet.name} deletePet={deletePet} />
    ))}
            

        </div>
    )
}

export default SumPet;