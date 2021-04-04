import React from 'react'
import Pet from "./Pet";
import "./SumPets.css";
function SumPet({pet_lists}) {
    return (
        <div className="petcard">
            <p>Pets: </p>
            {pet_lists.map((pet) => (
            <Pet info={pet}/>
            ))} 
        </div>
    )
}

export default SumPet
