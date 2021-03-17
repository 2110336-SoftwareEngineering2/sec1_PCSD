import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import "./UserInfo.css";
import Register_info from "./Register_info";
import Register_header from "./Register_header";
import JobInfo from "./JobInfo";
import MyPet from "./MyPet";
import SumPet from "./SumPet";
import { UserContext, RegisterContext } from "../context/MyContext";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { classname: "userInfo" };
    this.changeClassName = this.changeClassName.bind(this);
  }

  changeClassName() {
    this.setState({ classname: "expand" });
    this.props.func();
  }

  render() {
    return (
      <div className={this.state.classname}>
        <Register_header title={this.props.infotype} />
        <NextButton
          func={this.changeClassName}
          type={this.props.infotype}
          onChange={this.props.onChange}
        />
        {/*regis_header*/}
        {/*regis_info*/}
      </div>
    );
  }
}

export default UserInfo;

function NextButton(props) {
  const context = useContext(RegisterContext);
  const userContext = useContext(UserContext);
  const [state, setState] = useState({
    isNext: false,
  });
  const [values, setValue] = useState({
    ...context.data,
    username: "",
    confirmPass: "",
  });
  const [errors, setError] = useState({});

  const onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    props.onChange(e);
  };

  const clickedNext = (event) => {
    event.preventDefault();

    if(values.password !== values.confirmPass) {
      setError({confirmError: true});
      return;
    }

    if (!state.isNext) {
      const newUser = {
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password,
        mobileNumber: values.mobileNumber,
        gender: values.gender,
        role: values.role,
        banStatus: false,
        balance: 0
      };

      axios
        .post("http://localhost:4000/user/register", newUser)
        .then((res) => {
          console.log(res);
          res.data.password = newUser.password;
          axios
            .post("http://localhost:4000/auth/login", res.data)
            .then((response) => {
              userContext.login(response.data);
              console.log(response.data);
              setState({ isNext: true });
              if (props.type == "Caretaker") {
                props.func();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setError(err.response.data);
        });
    }
  };

  return (
    <div>
      {!state.isNext ? (
        <Register_info onChange={onChange} values={values} errors={errors} />
      ) : (
        <Info info={props.type} />
      )}
      {!state.isNext ? (
        <div className="nextbutton">
          <button className="submit" onClick={clickedNext}>
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Info(props) {
  return (
    <div>{props.info == "Caretaker" ? <JobInfo /> : <MyPet />}</div>
  );
}
