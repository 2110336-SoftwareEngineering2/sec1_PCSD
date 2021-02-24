import React from "react";

const MyContext = React.createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function ContextReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

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
    <contextProvider value={{ user: state.user, login, logout }} {...props} />
  );
}

export { MyContext, ContextProvider };
