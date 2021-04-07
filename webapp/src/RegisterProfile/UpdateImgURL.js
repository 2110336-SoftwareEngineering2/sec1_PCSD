import axios from "axios";
import React, { useState, useEffect } from "react";
function UpdateImgURL() {
  const [users, setUsers] = useState(null);
  /*useEffect(() => {
    axios.get("http://localhost:4000/user/emails").then((res) => {
      let data = {};
      for (let user of res.data)
        data[user.email] = user;
      setUsers(data);
    });
  }, []);*/

  useEffect(() => {
    axios.get("http://localhost:4000/user/usersinfo").then((res) => {
      console.log(res.data);
      /*let data = {};
      for (let user of res.data)
        data[user.email] = user;
      setUsers(data);*/
    });
  }, []);
  const update = () =>
    axios
      .get("http://localhost:4000/user/images")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  console.log(users);
  return <button onClick={()=>{}}>Update</button>;
}
export default UpdateImgURL;
