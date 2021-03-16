import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./chat.css"
import Header from "../Header/header";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
function ChatPage() {
    return(
        <div className = "ChatPage">
            {/*<Header />*/}
            <Header />
            <div style={tmpStyle} >
                <Sidebar />
                <Chatbox />
            </div>
        </div>
    );
}

const tmpStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
}
export default ChatPage;