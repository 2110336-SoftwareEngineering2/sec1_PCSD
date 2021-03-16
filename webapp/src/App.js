import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";

import { ContextProvider, RegisterProvider, ChatProvider } from "./context/MyContext";

function App() {
  return (
    <ContextProvider>
      <RegisterProvider>
        <ChatProvider>
          <div className="app">
            <Routes />
          </div>
        </ChatProvider>
      </RegisterProvider>
    </ContextProvider>
  );
}

export default App;
