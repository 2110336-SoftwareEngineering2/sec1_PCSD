import React from "react";
import history from "../history";

// User context
const UserContext = React.createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

// Register context for user registration
const RegisterContext = React.createContext({
  data: null,
  setData: (data) => {},
});

// Reducer for user context
function ContextReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      history.push({ pathname: "/" });
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

// Reducer for registration
function RegisterRuducer(state, action) {
  switch (action.type) {
    case "SETDATA":
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

// Context provider for user context
function ContextProvider(props) {
  const [state, dispatch] = React.useReducer(ContextReducer, { user: null });

  function login(userData) {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <UserContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

// Context provider for registration
function RegisterProvider(props) {
  const [state, dispatch] = React.useReducer(RegisterRuducer, { data: "" });

  function setData(data) {
    dispatch({
      type: "SETDATA",
      payload: data,
    });
  }

  return (
    <RegisterContext.Provider
      value={{ data: state.data, setData }}
      {...props}
    />
  );
}

export { UserContext, ContextProvider, RegisterContext, RegisterProvider };
