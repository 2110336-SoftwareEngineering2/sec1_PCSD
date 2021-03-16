import axios from "axios";
import socketIOClient from 'socket.io-client';
import React, { useEffect, useContext, useState } from "react"
import { ChatContext, UserContext } from "../context/MyContext";

function Chatbox(){
    const chatContext = useContext(ChatContext);
    const userContext = useContext(UserContext);
    const [messages, setMessage] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const email = userContext.user.email;
    const token = userContext.user.accessToken;
    const endpoint = "http://localhost:4000";
    
    useEffect(async () => {
        await getChatRoomDetail();
        // console.log(messages);
        // console.log(token)
        // console.log(chatContext.currentChatRoom)
        response();
    },)

    async function getChatRoomDetail () {
        const res = await axios.get(`http://localhost:4000/chat/rooms/${chatContext.currentChatRoom}`);
        const data = await res.data;
        setMessage(data.messages);
    } 

    function timeStampToDateStr (timestamp) {
        const dateObj = new Date(timestamp);
        return dateObj.toLocaleString();
    }

    function send () {
        // console.log(email)
        // const { endpoint, input, token, email } = this.state
        const socket = socketIOClient(endpoint, {
            query: {
                room: chatContext.currentChatRoom
            }
        });
        if (inputMessage.length !== 0) {
            const data = {
                message: inputMessage,
                user: email,
                email: email,
                token: token,
                time: Date.now()
            }
            socket.emit('sent-message', data);
            setInputMessage("");
        }
        // socket.disconnect();
    }

    function response (){
        // const { endpoint, message } = this.state
        const socket = socketIOClient(endpoint, {
            query: {
                "room": chatContext.currentChatRoom
            }
        })
        // console.log(socket)
        socket.on('new-message-status', (res) => {
            // console.log(res)
            messages.push({message: res.message, email: res.email, time: res.time});
            if (res.status == false) {
                window.alert(res.message);
            } else {
                setMessage(messages);
            }
        });

        socket.on('exception', (err) => {
            throw (err)
        });

    }
    
    function handleChangeInputMessage(e) {
        setInputMessage(e.target.value)
        // console.log(inputMessage)
    }
    // function handleOnClickSendMessage() {
    // }
    
    return (
        <div className = "Chatbox">
            <h1>ChatBox</h1>
            <h2>{chatContext.currentChatRoom}</h2>
            {messages.map((mDetail, idx) => {
                return (<p key={idx}>{mDetail.email}: {mDetail.message} ({timeStampToDateStr(mDetail.time)})</p>);
            })}
            <input onChange={handleChangeInputMessage} />
            <button onClick={() => send()}>send</button>
        </div>
    )
}
export default Chatbox;