import React, { useState } from "react";
import Pet from "./Pet";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import "./AddButton.css";

let id = 1;

function AddButton() {
    const [isNext, setIsNext] = useState(false);
    const [pet_lists, setPetlists] = useState([]);
    
    function clickedAdd(event) {
        if(!isNext)
        setIsNext(true);
        else  setIsNext(false);
    }
    
    function addPetList(name) {
        const newPet = {id, name};
        setPetlists([newPet, ...pet_lists]);
        id +=1;
    }
        return( 
            <div>
                {!isNext ? <AddPet addPetList = {addPetList} /> : <SumPet pet_lists={pet_lists} id={id}/> }
                 <div className="addbutton">
                    <button className="submit" onClick={clickedAdd}>Add Pet</button>
                 </div> 

            </div> 
        );
}

export default AddButton;