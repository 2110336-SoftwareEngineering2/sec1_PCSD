import React, { useContext, useState, useEffect, useRef } from "react";
import axios, { CancelToken }  from "axios";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import history from "../history";
import "./AddButton.css";

import { UserContext } from "../context/MyContext";
let id = 1;

function AddButton() {
  const { user } = useContext(UserContext);
  const componentIsMounted = useRef(true);
  // 0: AddPetForm, 1: AddButtonClicked, 2: SumPet
  const [pageState, setPageState] = useState(1);
  const [pet_lists, setPetlists] = useState([]);
  const [input, setInput] = useState({
    petType: "",
    petName: "",
    breed: "",
    age: "",
    gender: "",
  });
  
  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const cancelTokenSource = CancelToken.source();
    try {
      if (pageState === 1) {
        axios.get("http://localhost:4000/user/pet", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          if (componentIsMounted.current) {
            setPageState(2);
            setPetlists(res.data);
          }
        })
        .catch((err) => {
          if (componentIsMounted.current) {
            setPageState(0);
          }
          console.log(err)
        } );
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        return console.info(err);
      }
      console.error(err);
    }
    return () => {
      // here we cancel preveous http request that did not complete yet
      cancelTokenSource.cancel(
        "Cancelling previous http call because a new one was made ;-)"
      );
    };
  }, [pageState]);
  

  function onChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function clickedAdd() {
    if (pageState === 2) {
      setPageState(0);
    } else {
      const newPet = {
        petName: input.petName,
        breed: input.breed,
        age: input.age,
        gender: input.gender,
      };
      axios
      .post("http://localhost:4000/user/pet", newPet, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        console.log(res.data);
        setPageState(1);
      })
      .catch((err) => console.log(err));
    }
  }

  function deletePet(petId) {
    axios.delete("http://localhost:4000/user/pet", {
      headers: {
        Authorization: `Bearer ${user.accessToken}`
      },
      data: {
        source: petId
      }
    }).then((res) => {
      console.log(res.data);
      setPetlists(pet_lists.filter((pet) => pet._id !== petId));
    }).catch((err) => console.log(err));
  }

  return (
    <div>
      {pageState !== 2 ? (
        <AddPet
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
      {pageState !== 2 ? null : <button className="SignUpButton" onClick={() => {
                    history.push({ pathname: "/" });
                  }}>Save Change</button>}
      </div>
    </div>
  );
}

export default AddButton;
