import React, { useState } from "react";
import Pet from "./Pet";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import "./AddButton.css";

let id = 1;

function AddButton() {
    const [isNext, setIsNext] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const [pet_lists, setPetlists] = useState([]);

    
    function clickedAdd(event) {
        if(!isAdd) setIsAdd(true);
        else {
            setIsAdd(false);
            setIsNext(false);
        }
    }
    
    function addPetList(name, img, age, breed, gender) {
        const newPet = {id, name, img, age, breed, gender};
        setPetlists([newPet, ...pet_lists]);
        id +=1;
        setIsNext(true);
    }

    function deletePet(id) {
        setPetlists(pet_lists.filter((pet) => pet.id !== id));
    }
    
        return( 
            <div>
                {!isNext ? <AddPet addPetList = {addPetList} click = {isAdd} /> : <SumPet pet_lists={pet_lists} deletePet={deletePet}/> }
                 <div className="addbutton">
                    <button className="submit" onClick={clickedAdd}>Add Pet</button>
                 </div> 
            </div> 
        );
    
}

export default AddButton;