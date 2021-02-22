import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./chat.css"

export default class ChatPage extends React.Component{
    render(){
        <html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>Chat Mock</title>
    <link rel="stylesheet" type="text/css" media="screen" href="style.css"/>
  </head>
  <body>
    <div id ="chat-container">
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
  </body>
</html>
    }
}