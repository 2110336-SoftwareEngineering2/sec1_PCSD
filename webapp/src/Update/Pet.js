import React from "react";
import PropTypes from "prop-types";
import "./Pet.css";

function Pet({ pet, editPet, deletePet }) {
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

Pet.propTypes = {
  editPet: PropTypes.func.isRequired,
  deletePet: PropTypes.func.isRequired,
};
export default Pet;
