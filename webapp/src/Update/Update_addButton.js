import React, { useContext, useState, useEffect, useRef } from "react";
import axios, { CancelToken } from "axios";
import image from "./../petpic.png";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import history from "../history";
import "./AddButton.css";

import { UserContext } from "../context/MyContext";

const initialInput = {
  petType: "",
  petName: "",
  breed: "",
  age: "",
  gender: "",
  imgURL: image,
  petImg: null,
};

const PGSTATE = Object.freeze({
  DEFAULT: "DEFAULT",
  ADD_PET_FORM: "ADD_PET_FORM",
  EDIT_PET_FORM: "EDIT_PET_FORM",
  GET_PET_LIST: "GET_PET_LIST", // WHEN FINISHED => 3
  PET_SUMMARY: "PET_SUMMARY",
});

function AddButton() {
  const { user } = useContext(UserContext);
  const componentIsMounted = useRef(true);
  const [pageState, setPageState] = useState(PGSTATE.GET_PET_LIST);
  const [pet_lists, setPetlists] = useState([]);
  const [input, setInput] = useState(initialInput);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const cancelTokenSource = CancelToken.source();
    try {
      if (pageState === PGSTATE.GET_PET_LIST) {
        axios
          .get("http://localhost:4000/user/pet", {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          })
          .then((res) => {
            if (componentIsMounted.current) {
              setPageState(PGSTATE.PET_SUMMARY);
              setPetlists(res.data);
            }
          })
          .catch((err) => {
            if (componentIsMounted.current) {
              setPageState(PGSTATE.DEFAULT);
            }
            console.log(err);
          });
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
  }, [pageState, pet_lists]);

  function onChange(event) {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  function loadAddForm() {
    setInput({ ...initialInput });
    setPageState(PGSTATE.ADD_PET_FORM);
  }

  function loadEditForm(pet) {
    setInput({ ...pet });
    setPageState(PGSTATE.EDIT_PET_FORM);
  }

  function savePet() {
    const newPet = { ...input, hasImg: !!input.petImg };
    const link =
      "http://localhost:4000/user/pet" +
      (pageState == PGSTATE.EDIT_PET_FORM ? "/edit" : "");
    axios
      .post(link, newPet, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        input.petImg
          ? uploadPetPic(res.data)
          : setPageState(PGSTATE.GET_PET_LIST);
      })
      .catch((err) => console.log(err));
  }

  function uploadPetPic(pet) {
    const data = new FormData();
    data.append("email", pet._id);
    data.append("file", input.petImg);
    console.log(data);
    axios
      .post("http://localhost:4000/user/profilepic", data)
      .then((res) => {
        console.log(res);
        setPageState(PGSTATE.GET_PET_LIST);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deletePet(petId) {
    axios
      .delete("http://localhost:4000/user/pet", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        data: { source: petId },
      })
      .then((res) => {
        console.log(res.data);
        setPetlists(pet_lists.filter((pet) => pet._id !== petId));
      })
      .catch((err) => console.log(err));
  }

  console.log("PageState: " + pageState);

  return (
    <div>
      {pageState === PGSTATE.PET_SUMMARY ? (
        <SumPet
          pet_lists={pet_lists}
          editPet={loadEditForm}
          deletePet={deletePet}
        />
      ) : (
        <AddPet onChange={onChange} input={input} />
      )}
      <div className="addbutton">
        {pageState === PGSTATE.PET_SUMMARY ? (
          <button className="submit" onClick={loadAddForm}>
            Add Pet
          </button>
        ) : (
          <button className="submit" onClick={savePet}>
            Save Pet
          </button>
        )}
      </div>
      <div className="S">
        {pageState !== PGSTATE.PET_SUMMARY ? null : (
          <button
            className="SignUpButton"
            onClick={() => {
              history.push({ pathname: "/" });
            }}
          >
            Save Change
          </button>
        )}
      </div>
    </div>
  );
}

export default AddButton;
