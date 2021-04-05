import React, {useContext, useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import { ChatContext, UserContext } from "../context/MyContext";
import axios from "axios"
import { useCookies } from "react-cookie";
import socketIOClient from 'socket.io-client';

function ChatRoom({info}){
    const endpoint = "http://localhost:4000";
    const chatContext = useContext(ChatContext);
    const { user } = useContext(UserContext);
    const userContext = useContext(UserContext);
    const [unreadMessage, setUnreadMessage] = useState(null);
    const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
    const socketRef = useRef();
    const roomId = info.roomId;

    useEffect(() => {
        if (roomId != null) {
            socketRef.current = socketIOClient(endpoint, {
                query: {
                    room: roomId
                }
            });

            socketRef.current.on('new-unread-message', (res) => {
                // console.log(`update from unread ${res.unreadMessage}`);
                if (res.email === user.email) {
                    if (res.unreadMessage === 0) {
                        chatContext.updateUnreadMessage(roomId, 0);
                    }
                } else {
                    // console.log(res.unreadMessage)
                    if (res.unreadMessage !== 0) {
                        chatContext.updateUnreadMessage(roomId, chatContext.unreadMessage[roomId] + 1);
                    }
                }
            });

            socketRef.current.on('exception', (err) => {
                throw (err)
            });
            
            return () => {
                socketRef.current.disconnect();
            }
        }
    }, [chatContext.unreadMessage[roomId]])

    useEffect( async () => {
        const roomId = info.roomId;
        axios.get(`${endpoint}/chat/rooms/unread/${roomId}/${user.email}`, {
            headers: {
                "authorization": "Bearer " + cookie.accessToken
            }
        }).then((res) => {
            chatContext.updateUnreadMessage(roomId, res.data.unreadMessage);
        }).catch(err => console.log(err));

    }, [])

    async function handleOnClickChatPeople() {
        setCookie("chatroomTmp", info.roomId, {path: "/"});
        chatContext.changeChatRoom(info.roomId)
        read();
    }
    
    const read = () => {
        const data = {
            id: roomId,
            email: user.email,
            token: cookie.accessToken
        }
        socketRef.current.emit('read', data);
    }

    return(
        <div className = "Chat_People" onClick={() => handleOnClickChatPeople()}>
            <img className = "People_Profile" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/"+ info.title}/>
            <div className = "People_Name">{info.title} ({chatContext.unreadMessage[roomId]})</div>
        </div>
    );
}
export default ChatRoom;