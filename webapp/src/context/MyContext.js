import { fn } from "jquery";
import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

import history from "../history";
import { useCookies } from "react-cookie";

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

// Chat context
const ChatContext = React.createContext({
  currentChatRoom: "",
  unreadMessage: {},
  changeChatRoom: (roomId) => {},
  updateUnreadMessage: (roomId, unreadMessage) => {},
});

// Reducer for Chat Context
function ChatContextReducer(state, action) {
  switch (action.type) {
    case "CHANGE_CHAT_ROOM":
      return {
        ...state,
        currentChatRoom: action.payload,
      };
    case "UPDATE_UNREAD":
      return {
        ...state,
        unreadMessage: {...state.unreadMessage, [action.payload.roomId]: action.payload.unread}
      }
    default:
      return state;
  }
}

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
  const [cookie, setCookie, removeCookie] = useCookies();

  // useEffect(() => {
    // if (localStorage.getItem("jwtToken")) {
    //   const accessToken = localStorage.getItem("jwtToken");
    //   const decodedToken = jwtDecode(accessToken);

    //   if (decodedToken.exp * 1000 < Date.now()) {
    //     localStorage.removeItem("jwtToken");
    //   } else {
    //     axios
    //       .post("http://localhost:4000/user", { email: decodedToken.email })
    //       .then((res) => {
    //         login({ ...res.data, accessToken: accessToken });
    //       })
    //       .catch((err) => console.log(err));
    //   }
    // }
    // if (cookie.accessToken !== undefined) {
      // console.log("hasdas")
      // console.log(cookie.accessToken)
  //     axios
  //       .post("http://localhost:4000/auth/valid", {}, {
  //         headers: {
  //           "authorization": "Bearer " + cookie.accessToken
  //         }
  //       })
  //       .then((res) => {
  //         axios
  //           .post("http://localhost:4000/user", {email: (res.data).email})
  //           .then((res) => {
  //             login({...res.data, accessToken: cookie.accessToken});
  //           })
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         removeCookie("accessToken", {path: "/"});
  //       });
  //   }
  // }, []);

  function login(userData) {
    // localStorage.setItem("jwtToken", userData.accessToken);
    if(cookie.accessToken === undefined)
      setCookie("accessToken", userData.accessToken, { path: "/" });
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function logout() {
    // localStorage.removeItem("jwtToken");
    for (var key in cookie) {
      removeCookie(key, {path: "/"});
    }
    // removeCookie("accessToken", {path: "/"});

    dispatch({ type: "LOGOUT" });
  }

  return (
    <UserContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

// Context provider for chat context
function ChatProvider(props) {
  const [state, dispatch] = React.useReducer(ChatContextReducer, {
    currentChatRoom: null,
    unreadMessage: {},
  });

  function changeChatRoom(chatRoomId) {
    dispatch({
      type: "CHANGE_CHAT_ROOM",
      payload: chatRoomId,
    });
  }

  function updateUnreadMessage(roomId, unread) {
    dispatch({
      type: "UPDATE_UNREAD",
      payload: {
        roomId: roomId,
        unread: unread
      }
    });
  }

  return (
    <ChatContext.Provider
      value={{ currentChatRoom: state.currentChatRoom, unreadMessage: state.unreadMessage, updateUnreadMessage, changeChatRoom }}
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

export {
  UserContext,
  ContextProvider,
  RegisterContext,
  RegisterProvider,
  ChatContext,
  ChatProvider,
};
