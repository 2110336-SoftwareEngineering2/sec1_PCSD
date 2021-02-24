import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./chat.css"

export default class ChatPage extends React.Component{
    render(){
        <div class ="chat-container">
        <div id = "search-container">
            <input type="text" placeholder="Seach on Chats:"/>
        </div>
        <div id = "conversation-list">
            
        </div>
        <div id = "new-chat-container">
            <a href="#">+</a>
        </div>
        <div id = "chat-title">

        </div>
        <div id = "chat-mesages">

        </div>
        <div id = "chat-form">

        </div>
        </div>
    }
}
export default ChatPage;