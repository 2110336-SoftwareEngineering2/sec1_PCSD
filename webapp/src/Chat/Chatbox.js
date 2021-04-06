import axios from "axios";
import socketIOClient from 'socket.io-client';
import React, { useEffect, useContext, useState, useRef } from "react"
import { ChatContext, UserContext } from "../context/MyContext";
//import ReactDOM from "react-dom";
import {useWindowScroll} from 'react'
//import {FixedSizeList as List} from 'react-window';
import {Container} from "react-bootstrap"
import {Avatar} from "@material-ui/core"
import Icon from "@material-ui/core/Icon"
import Amesage from "./amesage";
//import classNames from 'classnames';
//const dump_chat = []
import { useCookies } from "react-cookie";




function Chatbox({roomId}){
    // const chatContext = useContext(ChatContext);
    const userContext = useContext(UserContext);
    const chatContext = useContext(ChatContext);
    const [interactor,setInteractor] = useState("");
    const [inter,setInter] = useState("")
    const [messages, setMessage] = useState([]);
    const [members,setMember] = useState([])
    const [inputMessage, setInputMessage] = useState("");
    const socketRef = useRef();
    const email = userContext.user.email;
    const token = userContext.user.accessToken;
    const endpoint = "http://localhost:4000";
    //to scroll to buttom
    const endRef = useRef(null);
    const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);

    
    useEffect(() => {
        if (roomId != null) {
            socketRef.current = socketIOClient(endpoint, {
                query: {
                    room: roomId
                }
            });

            socketRef.current.on('new-message-status', (res) => {
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
        return () => {
            setMessage([]);
        }
    }, [roomId])

    
    
    

    async function getChatRoomDetail () {
        if (roomId != null) {
            const res = await axios.get(`http://localhost:4000/chat/rooms/${roomId}`, {
                headers: {
                    authorization: 'Bearer ' + cookie.accessToken
                }
            });
            const data = res.data;
            //  console.log(data)
            setMessage(data.messages);
            setMember(data.members);
        }
    } 
    
    

    function timeStampToDateStr (timestamp) {
        const dateObj = new Date(timestamp);
        return dateObj.toLocaleString();
    }

    function send () {
        // var unreadMessage = chatContext.unreadMessage[chatContext.currentChatRoom];
        // unreadMessage++;
        // console.log(unreadMessage)
        
        if (inputMessage.length !== 0) {
            const data = {
                message: inputMessage,
                user: email,
                email: email,
                token: token,
                time: Date.now()
            }
            socketRef.current.emit('sent-message', data);
            socketRef.current.emit('update-unread-message', {email: email, unreadMessge: 1});
            setInputMessage("");
        }
    }
    
    function handleChangeInputMessage(e) {
        setInputMessage(e.target.value)
    }

    //prototype for scrolling
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView());
        return <div ref={elementRef} />;
    };
    const Messages = ({ message }) => (
        <div>
            {message.map((mDetail, idx) => {
                return <Amesage email = {mDetail.email} message = {mDetail.message} timestamp = {timeStampToDateStr(mDetail.time)} is_user = {mDetail.email==email} />
                    //return (<p key={idx}>{mDetail.email}: {mDetail.message} ({timeStampToDateStr(mDetail.time)})</p>);
            })}
          <AlwaysScrollToBottom />
        </div>
      )
    const getName = () => {
        if({roomId}!=null){
            //console.log(members);
            var Inter = ""
            if(email==members[0]){
                //return <h1> <getName email = {members[1]} /> </h1>
                Inter  = members[1];
            }
            else {
                //return <h1> <getName email = {members[0]} /> </h1>
                var Inter = members[0];
        }}
        
        axios
        .post("http://localhost:4000/user/email", {email: Inter})
        .then((res) => {
            //console.log(res.data.firstname)
            setInter(Inter)
            setInteractor(res.data.firstname + " " + res.data.lastname)
            return res.data;
            })
        .catch((err) => {
            console.log(err);
            });

    }
    const Chat_Title = () =>{
        if({roomId}!=email){
            //console.log(members);
            getName()
            return (<div className = "Interacter">
                        <Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + inter} />
                        <div className = "Interacter2">{interactor}</div>
                    </div>);
        }else{
            console.log("error");
            return <div className = "Interacter">ChatBox</div>
        }

    }
    
    return (
        <div className = "Chatbox">            
                <Container fixed = 'md' className = "d-flex flex-column py-2" style ={{height:"90vh"}} >
                    <div className = "Messages">
                        <Chat_Title />
                    {/* <h2>{roomId}</h2> */}
                        <div className = "Chat_Messages" style = {{overflowY :"auto"}}>
                            {//scroll this rewrite this section script
                            
                            //<Amesage email = "nsn@email.com" message = "Hello" timestamp = "07:08:10" is_user = {true} />
                            }
                                <Messages message = {messages} />
                                {/*messages.map((mDetail, idx) => {
                                    return <Amesage email = {mDetail.email} message = {mDetail.message} timestamp = {timeStampToDateStr(mDetail.time)} is_user = {mDetail.email==email} />
                                    //return (<p key={idx}>{mDetail.email}: {mDetail.message} ({timeStampToDateStr(mDetail.time)})</p>);
                                })*/}
                        </div>
                    </div>
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