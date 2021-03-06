import React, {useState, useEffect, useContext,useRef} from 'react'
import axios from "axios"
import ChatRoom from "./ChatRoom"
import { UserContext, ChatContext } from "../context/MyContext";
import { useCookies } from "react-cookie";

function ChatList(){

    const [chatPeoples,setPeoples] = useState([])
    const [people, setPeople] = useState([])
    const myData = useContext(UserContext)
    const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
    const chatContext = useContext(ChatContext);
    const socketRef = useRef();

    useEffect(async () => {
        const res = await axios.get(`http://localhost:4000/chat/${myData.user.email}`, {
            headers: {
                "authorization": "Bearer " + cookie.accessToken
            }
        });
        const allinfo = []
        for (var i=(res.data).length-1; i>=0; i--) {
            allinfo.push((res.data)[i])
        }

        setPeoples(allinfo)

    })

    const getChatroomTitle = (members) => {
        const myEmail = myData.user.email;
        const title = members[0] === myEmail ? members[1] : members[0];
        return title;
    }
    return(
        <div className = 'ChatList'>
            {/* <ChatPeople name = 'AA'/> */}
            {//chatPeoples.reverse()
            }
            {chatPeoples.map((data, idx) => {
                const info = {
                    title: getChatroomTitle(data.members),
                    members: data.members,
                    roomId: data._id
                }
                return (<ChatRoom info={info} key={idx} />)
            })}
        </div>

    );
}
export default ChatList;