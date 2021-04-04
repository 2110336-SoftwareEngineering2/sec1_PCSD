import React, { useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/MyContext";
import "./ProfileCard.css";

function ProfileCard(props) {
  const { user } = useContext(UserContext);
  const user_fullname = user.firstname + " " + user.lastname;
  const imgURL = "https://pcsdimage.s3-us-west-1.amazonaws.com/" + user.email;
  console.log(user);
  return (
    <Container className="my-card">
      <Card className="text-center mx-auto" style={{ width: "100%" }}>
        <Card.Header className="h4">Pet Owner</Card.Header>
        <Card.Body>
          <Card.Title as="h3">{user_fullname}</Card.Title>
          <Card.Subtitle className="text-muted">@{user.username}</Card.Subtitle>
        </Card.Body>
        <Card.Body>
          <div>
            <Card.Img src={imgURL} />
          </div>
          <Button variant="danger">
            <b>Choose Photo</b>
          </Button>
        </Card.Body>
        <Card.Body>
          <Card.Text className="text-muted small">
            Acceptable formats: <b className="text-dark">JPG, PNG</b>
          </Card.Text>
          <Card.Text className="text-muted small">
            Max file size: <b className="text-dark">500 KB</b>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default ProfileCard;
