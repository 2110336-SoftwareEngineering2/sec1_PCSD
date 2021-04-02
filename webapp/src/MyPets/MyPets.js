import React, { useContext, useState, useEffect, useRef } from "react";
import axios, { CancelToken } from "axios";

import Header from "../Header/header";
import PetForm from "./PetForm";
import PetSummaries from "./PetSummaries";
import { UserContext } from "../context/MyContext";
import background from "./EditBg.jpg";
import "./MyPets.css";
function MyPets(props) {
  console.log("Hello Test");
  const { user } = useContext(UserContext);
  const componentIsMounted = useRef(true);
  const [currentPet, setCurrentPet] = useState(null);
  const [petList, setPetList] = useState(null);
  const [isImgReady, setIsImgReady] = useState(true);
  const [isFormPage, setIsFormPage] = useState(false);

  useEffect(() => {
    return () => {
      componentIsMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isFormPage || petList !== null) return;
    const cancelTokenSource = CancelToken.source();
    try {
      console.log("Get PetLists");
      axios
        .get("http://localhost:4000/user/pet", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        })
        .then((res) => {
          if (componentIsMounted.current) setPetList(res.data);
        })
        .catch((err) => {
          if (componentIsMounted.current) console.log(err);
        });
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
  }, [isFormPage]);

  function showSummaries() {
    setIsFormPage(false);
    setCurrentPet(null);
  }

  function showFormPage() {
    setIsFormPage(true);
    setPetList(null);
  }

  function editPet(pet) {
    setCurrentPet(pet);
    showFormPage();
  }

  function deletePet(petId) {
    axios
      .delete("http://localhost:4000/user/pet", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        data: { source: petId },
      })
      .then((res) => {
        console.log(res.data);
        setPetList(petList.filter((pet) => pet._id !== petId));
      })
      .catch((err) => console.log(err));
  }

  function savePet(pet, isNewPet) {
    const link = "http://localhost:4000/user/pet" + (isNewPet ? "" : "/edit");
    axios
      .post(link, pet, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => {
        if (pet.hasImg) uploadPetPic(res.data, pet.petImg);
        showSummaries();
      })
      .catch((err) => console.log(err));
  }

  function uploadPetPic(pet, img) {
    setIsImgReady(false);
    const data = new FormData();
    data.append("email", pet._id);
    data.append("file", img);
    console.log(data);
    axios
      .post("http://localhost:4000/user/profilepic", data)
      .then((res) => {
        console.log(res);
        setIsImgReady(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="mypets" style={{ 
      backgroundImage: `url(${background})`
    }}> 
      <Header />
      <h1>My Pets</h1>
      {isFormPage ? (
        <PetForm
          currentPet={currentPet}
          savePet={savePet}
          cancelForm={showSummaries}
        />
      ) : petList === null || !isImgReady ? (
        "Loading"
      ) : (
        <PetSummaries
          pets={petList}
          addPet={showFormPage}
          editPet={editPet}
          deletePet={deletePet}
        />
      )}
    </div>
  );
}

export default MyPets;
