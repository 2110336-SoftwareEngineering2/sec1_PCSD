import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./chat.css"
import Header from "../Header/header";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import { ChatContext } from "../context/MyContext";
import { useCookies } from "react-cookie";

function ChatPage() {
    const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
    const chatContext = useContext(ChatContext);
    useEffect(() => {

        if (cookie.chatroomTmp !== undefined) {
            // console.log(cookie.chatroomTmp)
            chatContext.changeChatRoom(cookie.chatroomTmp);
        }
    }, []);

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