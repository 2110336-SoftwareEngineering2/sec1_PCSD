import React, { useState } from "react";
import axios from "axios";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import history from "./../history";
import "./AddButton.css";

let id = 1;

function AddButton() {
  const [isNext, setIsNext] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [pet_lists, setPetlists] = useState([]);
  const [input, setInput] = useState({
    petType: "",
    petName: "",
    breed: "",
    age: "",
    gender: "",
  });

  function onChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function clickedAdd(event) {
    if (!isAdd) setIsAdd(true);
    else {
      setIsAdd(false);
      setIsNext(false);
    }

    const newPet = {
      petName: input.petName,
      breed: input.breed,
      age: input.age,
      gender: input.gender,
    };

    axios
      .post("http://localhost:4000/user/pet", newPet)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  function addPetList(name, img, age, breed, gender) {
    const newPet = { id, name, img, age, breed, gender };
    setPetlists([newPet, ...pet_lists]);
    id += 1;
    setIsNext(true);
  }

  function deletePet(id) {
    setPetlists(pet_lists.filter((pet) => pet.id !== id));
  }

  return (
    <div>
      {!isNext ? (
        <AddPet
          addPetList={addPetList}
          click={isAdd}
          onChange={onChange}
          input={input}
        />
      ) : (
        <SumPet pet_lists={pet_lists} deletePet={deletePet} />
      )}
      <div className="addbutton">
        <button className="submit" onClick={clickedAdd}>
          Add Pet
        </button>
      </div>
      <div className="S">
      {!isNext ? null : <button className="SignUpButton" onClick={() => {
                    history.push({ pathname: "/" });
                  }}>Sign Up</button>}
      </div>
    </div>
  );
}

export default AddButton;
