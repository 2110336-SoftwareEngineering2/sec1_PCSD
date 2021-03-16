import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { ChatContext } from "../context/MyContext";
import axios from "axios"

function ChatRoom({info}){
    const chatContext = useContext(ChatContext);

    function handleOnClickChatPeople() {
        chatContext.changeChatRoom(info.roomId)
        // console.log(chatContext)
    }

    return(
        <div className = "Chat_People" onClick={() => handleOnClickChatPeople()}>
            <img className = "People_Profile" src = "https://source.unsplash.com/random"/>
            <div className = "People_Name">{info.title}</div>
        </div>
    );
}
export default ChatRoom;