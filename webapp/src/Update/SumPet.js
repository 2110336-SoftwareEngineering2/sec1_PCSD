import React from "react";
import Pet from "./Pet";
import "./Sumpet.css";
function SumPet({ pet_lists, editPet, deletePet }) {
  return (
    <div className="sumpet">
      {pet_lists.map((pet) => (
        <Pet
          pet={pet}
          editPet={() => editPet(pet)}
          deletePet={() => deletePet(pet._id)}
        />
      ))}
    </div>
  );
}

export default SumPet;
