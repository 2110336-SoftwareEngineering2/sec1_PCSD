import React from "react";
import { Button, Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar } from "@material-ui/core";

function PetSummaries({ pets, addPet, editPet, deletePet }) {
  return !pets ? (
    <Spinner animation="border" variant="danger" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  ) : (
    <div id="pet_summary">
      <div>
        {pets.map((pet) => (
          <PetBanner
            key={pet._id}
            pet={pet}
            editPet={() => editPet(pet)}
            deletePet={() => deletePet(pet._id)}
          />
        ))}
      </div>
      <div className="text-right mt-3">
        <Button className="submit" onClick={addPet}>
          Add Pet
        </Button>
      </div>
    </div>
  );
}

export default PetSummaries;

function PetBanner({ pet, editPet, deletePet }) {
  console.log(pet);
  return (
    <Card className="mx-1 mx-sm-5">
      <Card.Header>{pet.petType}</Card.Header>
      <Row className="no-gutters align-items-center pt-4 pt-sm-0">
        <Col xs="9" sm="4" md="3">
          <Avatar className="mx-auto m-2" src={pet.imgURL} />
        </Col>
        <Col xs="3" sm="1" md className="text-center">
          <Button style={{ display: "block" }} variant="info" onClick={editPet}>
            <EditTwoToneIcon />
          </Button>
          <Button
            style={{ display: "block" }}
            variant="danger"
            onClick={deletePet}
          >
            <DeleteIcon />
          </Button>
        </Col>
        <Col xs="12" sm="7" md="8" className="px-3 px-sm-5">
          <Card.Body>
            <Card.Title>
              {pet.petName}&nbsp;
              <Badge pill variant="secondary" className={pet.gender}>
                {pet.gender === "male" ? "♂" : "♀"}
              </Badge>
            </Card.Title>
            <Card.Text className="my-1 text-secondary">
              <b>Age: </b>
              {pet.age}
            </Card.Text>
            <Card.Text className="my-1 text-secondary">
              <b>Breed: </b>
              {pet.breed}
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}
