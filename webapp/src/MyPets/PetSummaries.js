import React from "react";
import "./PetSummaries.css";
function PetSummaries({ pets, addPet, editPet, deletePet }) {
  return (
    <div className="petsum">
      <div className="sumpet">
        {pets.map((pet) => (
          <PetBanner
            key={pet._id}
            pet={pet}
            editPet={() => editPet(pet)}
            deletePet={() => deletePet(pet._id)}
          />
        ))}
      </div>
      <div className="addbutton">
        <button className="submit" onClick={addPet}>
          Add Pet
        </button>
      </div>
    </div>
  );
}

export default PetSummaries;

function PetBanner({ pet, editPet, deletePet }) {
  console.log(pet);
  return (
    <div className="pet">
      <img className="Pet__image" src={pet.imgURL} />
      <div className="col-5 pet_info">
        <div className="Pet__name">
          {pet.petName}, {pet.age}, {pet.gender}
        </div>
        <button className="Pet__edit" onClick={editPet}>
          Edit
        </button>
      </div>

      <button className="Pet__delete" onClick={deletePet}>
        X
      </button>
    </div>
  );
}
