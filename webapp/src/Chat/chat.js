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
            {/*<Header />*/}
            <Header />
            <div style={tmpStyle} >
                <Sidebar />
                <Chatbox roomId={chatContext.currentChatRoom}/>
            </div>
        </div>
    );
}

const tmpStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
}
export default ChatPage;