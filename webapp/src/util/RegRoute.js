import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../context/MyContext";

function RegRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
}

export default RegRoute;
