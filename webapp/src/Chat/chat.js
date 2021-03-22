import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./chat.css"
import Header from "../Header/header";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import { ChatContext } from "../context/MyContext";
function ChatPage() {

    const chatContext = useContext(ChatContext);
    return(
        <div className = "ChatPage">
            <Header />
            <div className = 'Chatpage_Components'>
                <Sidebar />
                <Chatbox roomId={chatContext.currentChatRoom}/>
            </div>
        </div>
    );
}


export default ChatPage;