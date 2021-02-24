import React, { useState } from "react";
import axios from "axios";
import Pet from "./Pet";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
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
    if (!isNext && !isAdd) {
      setIsNext(true);
      setIsAdd(true);
    } else {
      setIsNext(false);
      setIsAdd(false);
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

  function addPetList(name) {
    const newPet = { id, name };
    setPetlists([newPet, ...pet_lists]);
    id += 1;
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
        <SumPet pet_lists={pet_lists} id={id} />
      )}
      <div className="addbutton">
        <button className="submit" onClick={clickedAdd}>
          Add Pet
        </button>
      </div>
    </div>
  );
}

export default AddButton;
