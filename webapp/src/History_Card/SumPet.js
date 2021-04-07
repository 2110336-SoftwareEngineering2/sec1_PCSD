import React from 'react'
import Pet from "./Pet";
import "./SumPets.css";
import Carousel from 'react-bootstrap/Carousel'
function SumPet({pet_lists}) {
    return (
        <div className="petcard">
             <Carousel>
            {pet_lists.map((pet) => (
                <Carousel.Item>
            <Pet info={pet}/>
            </Carousel.Item>
            ))} 
            </Carousel>
        </div>
    )
}

export default SumPet
