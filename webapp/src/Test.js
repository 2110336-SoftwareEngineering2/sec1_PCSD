import React, { useState } from "react";
import Test2 from "./Test2";

function Test(props) {
  const [state, setState] = useState({
    message: "hello",
  });

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(state.message);
  };

  const onChange = (event) => {
    setState({ [event.target.name]: event.target.value });
  };

  return (
    <div className="test">
      <form onSubmit={onSubmit}>
        <Test2 onChange={onChange} message={state.message} />
        <button type="submit">Click ME!</button>
      </form>
    </div>
  );
}

export default Test;
