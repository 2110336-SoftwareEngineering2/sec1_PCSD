import React, { useState , useContext } from "react";
import "./UserProfile.css";
import image from "./../userpic.png";
import axios from "axios";
function UserProfile({ uInfo, isNextt }) {
  // console.log(uInfo);
  const [img, setImage] = useState({image});
  const [isNext, setIsNext] = useState(false);
  // const [file, setFile] = useState();
  function uploadImg(event) {
    // setFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]); 
    setImage(url);
    if(isNext) {
      addPic(event);
    }
  }

  function addPic(event) {
    const data = new FormData();
    data.append("email", uInfo.email);
    data.append("file", event.target.files[0]);

    console.log(data);

    axios.post("http://localhost:4000/user/profilepic",data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <div className="profile">
      <h3>
        {uInfo.firstname} {uInfo.lastname}
      </h3>
      <br />
      <label className="blacklabel">@{uInfo.username}</label>
      <br />
      <img src={img} />
      <br />
      <label id="inputfile">
        Upload Your Photo{" "}
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={uploadImg}
        />
      </label>
      <div className="inputformat">
        <label>
          Acceptable formats: <b className="blacklabel">jpg, png</b> only
        </label>
        <br />
        <label>
          Max file size is <b className="blacklabel">500 KB</b> and min size{" "}
          <b className="blacklabel">70 KB</b>
        </label>
      </div>
    </div>
  );
}

export default UserProfile;
