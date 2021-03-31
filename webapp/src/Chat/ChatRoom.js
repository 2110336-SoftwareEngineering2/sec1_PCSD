import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import { ChatContext, UserContext } from "../context/MyContext";
import axios from "axios"
import { useCookies } from "react-cookie";

function ChatRoom({info}){
    const chatContext = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const userContext = useContext(UserContext);
    const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

    async function handleOnClickChatPeople() {
        chatContext.changeChatRoom(info.roomId)
        // console.log(chatContext)
        await axios.post(`http://localhost:4000/chat/read`, {id: chatContext.currentChatRoom, email: userContext.user.email}, {
            headers: {
                "authorization": "Bearer " + cookie.accessToken
            }
        });
    }

    return(
        <div className = "Chat_People" onClick={() => handleOnClickChatPeople()}>
            <img className = "People_Profile" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/"+ info.title}/>
            <div className = "People_Name">{info.title}</div>
        </div>
    );
}
export default ChatRoom;