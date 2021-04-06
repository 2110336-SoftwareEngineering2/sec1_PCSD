import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "../context/MyContext";

import Header from "../Header/header";
import PetForm from "./PetForm";
import PetSummaries from "./PetSummaries";
import background from "./EditBg.jpg";
import "./MyPets.css";

import history from "../history";
import axios from "axios";

function MyPets() {
  const { user } = useContext(UserContext);
  const [currentPet, setCurrentPet] = useState(null);
  const [petList, setPetList] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/pet", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) => setPetList(res.data))
      .catch((err) => console.log(err));
  }, []);

  function reloadPage() {
    history.push("./pets");
    history.go();
  }

  function deletePet(petId) {
    axios
      .delete("http://localhost:4000/user/pet", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
        data: { source: petId },
      })
      .then(() => setPetList(petList.filter((pet) => pet._id !== petId)))
      .catch((err) => console.log(err));
  }

  function savePet(pet, isNewPet) {
    const link = "http://localhost:4000/user/pet" + (isNewPet ? "" : "/edit");
    axios
      .post(link, pet, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((res) =>
        pet.hasImg ? uploadPetPic(res.data, pet.petImg) : reloadPage()
      )
      .catch((err) => console.log(err));
  }

  function uploadPetPic(pet, img) {
    const data = new FormData();
    data.append("email", pet._id);
    data.append("file", img);
    console.log(data);
    axios
      .post("http://localhost:4000/user/profilepic", data)
      .then((res) => {
        console.log(res);
        reloadPage();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${background})`,
      }}
    >
      <Header />
      <div id="my_pet_info">
        <h1 style={{ color: "brown" }}>My Pets</h1>
        <Card>
          <Card.Body>
            {showForm ? (
              <PetForm
                currentPet={currentPet}
                savePet={savePet}
                cancelForm={reloadPage}
              />
            ) : (
              <PetSummaries
                pets={petList}
                addPet={() => setShowForm(true)}
                editPet={(pet) => {
                  setCurrentPet(pet);
                  setShowForm(true);
                }}
                deletePet={deletePet}
              />
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default MyPets;
