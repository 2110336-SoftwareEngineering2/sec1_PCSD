import axios from "axios";
import socketIOClient from 'socket.io-client';
import React, { useEffect, useContext, useState, useRef } from "react"
import { ChatContext, UserContext } from "../context/MyContext";
//import {FixedSizeList as List} from 'react-window';
import {Container} from "react-bootstrap"
import Icon from "@material-ui/core/Icon"
//import classNames from 'classnames';
//const dump_chat = []

function Chatbox({roomId}){
    // const chatContext = useContext(ChatContext);
    const userContext = useContext(UserContext);
    const [messages, setMessage] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const socketRef = useRef();
    const email = userContext.user.email;
    const token = userContext.user.accessToken;
    const endpoint = "http://localhost:4000";
    
    useEffect(() => {
        // console.log(roomId)
        if (roomId != null) {
            // await getChatRoomDetail();
            // response();
            socketRef.current = socketIOClient(endpoint, {
                query: {
                    room: roomId
                }
            });

            // socketRef.current.on('new-message')
            socketRef.current.on('new-message-status', (res) => {
                // var tmp = messages;

                // tmp.push();
                if (res.status == false) {
                    window.alert(res.message);
                } else {
                    setMessage([...messages, {message: res.message, email: res.email, time: res.time}]);
                }
            });

            socketRef.current.on('exception', (err) => {
                throw (err)
            });
            
            return () => {
                socketRef.current.disconnect();
            }
        }

    }, [messages]);

    useEffect(async() => {
        await getChatRoomDetail();
    }, [roomId])

    async function getChatRoomDetail () {
        if (roomId != null) {
            const res = await axios.get(`http://localhost:4000/chat/rooms/${roomId}`);
            const data = res.data;
            // console.log(data)
            setMessage(data.messages);
        }
    } 

    function timeStampToDateStr (timestamp) {
        const dateObj = new Date(timestamp);
        return dateObj.toLocaleString();
    }

    function send () {
        // console.log(email)
        // const { endpoint, input, token, email } = this.state
        // const socket = socketIOClient(endpoint, {
        //     query: {
        //         room: chatContext.currentChatRoom
        //     }
        // });
        
        if (inputMessage.length !== 0) {
            const data = {
                message: inputMessage,
                user: email,
                email: email,
                token: token,
                time: Date.now()
            }
            socketRef.current.emit('sent-message', data);
            setInputMessage("");
        }
        // socket.disconnect();
    }

    // function response (){
    //     // const { endpoint, message } = this.state
    //     const socket = socketIOClient(endpoint, {
    //         query: {
    //             "room": chatContext.currentChatRoom
    //         }
    //     })
    //     // console.log(socket)
    //     socket.on('new-message-status', (res) => {
    //         // console.log(res)
    //         messages.push({message: res.message, email: res.email, time: res.time});
    //         if (res.status == false) {
    //             window.alert(res.message);
    //         } else {
    //             setMessage(messages);
    //         }
    //     });

    //     socket.on('exception', (err) => {
    //         throw (err)
    //     });

    // }
    
    function handleChangeInputMessage(e) {
        setInputMessage(e.target.value)
    }
    // function handleOnClickSendMessage() {
    // }
    
    return (
        <div className = "Chatbox">
            {/*
                {}
            </div>
            
                <input ></input>
                <button >Send</button>*/}
            
            
            
                <Container fixed = 'md' className = "d-flex flex-column py-2" style ={{height:"90vh"}} >
                    <div className = "Messages">
                        <h1>ChatBox</h1>
                    {/* <h2>{roomId}</h2> */}
                    {/*<List
                        className = 'Messages_List'
                        height = {150} 
                        itemCount = {1000}
                        itemSize = {35}
                        width = {300}
                    >*/}
                        <div className = "Chat_Messages" style = {{overflowY :"auto"}}>
                            {messages.map((mDetail, idx) => {
                                return (<p key={idx}>{mDetail.email}: {mDetail.message} ({timeStampToDateStr(mDetail.time)})</p>);
                            })}
                        </div>
                    </div>
                    {/*</List>*/}
                    <div className = "Downside_Bar">
                        <input className = "Message_Box" onChange={handleChangeInputMessage} value = {inputMessage}/>
                        <button className = "Send_Chat" onClick={() => send()}>
                            send
                        </button>
                    </div>
                </Container>
        </div>
    )
}
export default Chatbox;