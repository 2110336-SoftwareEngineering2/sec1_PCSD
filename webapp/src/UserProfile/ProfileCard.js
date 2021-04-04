import React, { useContext } from "react";
import { Container, Card, Button, FormFile } from "react-bootstrap";
import { UserContext } from "../context/MyContext";

function ProfileCard({ info, updateImage }) {
  const { user } = useContext(UserContext);
  const user_fullname = info.firstname + " " + info.lastname;
  const imgURL = info.userImg
    ? URL.createObjectURL(info.userImg)
    : "https://pcsdimage.s3-us-west-1.amazonaws.com/" + info.email;
  console.log(user);

  function uploadImage(event) {
    updateImage({ ...info, userImg: event.target.files[0] });
  }

  return (
    <Container className="my-card">
      <Card className="text-center mx-auto" style={{ width: "100%" }}>
        <Card.Header className="h4">Pet Owner</Card.Header>
        <Card.Body>
          <Card.Title as="h3">{user_fullname}</Card.Title>
          <Card.Subtitle className="text-muted">@{info.username}</Card.Subtitle>
        </Card.Body>
        <Card.Body>
          <div>
            <Card.Img src={imgURL} />
          </div>
          <div>
            <Button onClick={() => document.getElementById("uImg").click()}>
              Choose Photo
            </Button>
            <FormFile
              id="uImg"
              accept="image/png, image/jpeg"
              name="uImg"
              onChange={uploadImage}
              hidden
            />
          </div>
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
