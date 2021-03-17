import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { ChatContext } from "../context/MyContext";
import { UserContext } from "../context/MyContext";
import axios from "axios"

function ChatRoom({info}){
    const chatContext = useContext(ChatContext);
    const { user } = useContext(UserContext);
    function handleOnClickChatPeople() {
        chatContext.changeChatRoom(info.roomId)
        // console.log(chatContext)
    }

    return(
        <div className = "Chat_People" onClick={() => handleOnClickChatPeople()}>
            <img className = "People_Profile" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/"+ info.title}/>
            <div className = "People_Name">{info.title}</div>
        </div>
    );
}
export default ChatRoom;