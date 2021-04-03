import React from 'react'
import Pet from "./Pet";
function SumPet({pet_lists}) {
    console.log("top",pet_lists);
    return (
        <div>
            {pet_lists.map((pet) => (
            <Pet info={pet}/>
            ))} 
        </div>
    )
}

export default SumPet
