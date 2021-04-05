import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import { UserContext } from "../context/MyContext";
import { useCookies } from "react-cookie";
import axios from "axios";
import history from "../history";

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);
  const userContext = useContext(UserContext);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  
  useEffect(() => {
    if (cookie.accessToken !== undefined) {
      axios
        .post("http://localhost:4000/auth/valid", {}, {
          headers: {
            "authorization": "Bearer " + cookie.accessToken
          }
        })
        .then((res) => {
          axios
            .post("http://localhost:4000/user/email", {email: (res.data).email})
            .then((res) => {
              userContext.login({...res.data, accessToken: cookie.accessToken});
            });
            // console.log(userContext)
        })
        .catch((err) => {
          console.log(err);
          removeCookie("accessToken", {path: "/"});
        });
    }
    else {
      history.push({pathname: "/"});
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        // user ? <Component {...props} /> : <Redirect to="/" />
        user ? <Component {...props} /> : null 
        // <Component {...props} />
      }
    />
  );
}

export default AuthRoute;
