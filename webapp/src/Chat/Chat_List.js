import React, {useState, useEffect, useContext} from 'react'
import axios from "axios"
import ChatRoom from "./ChatRoom"
import { UserContext } from "../context/MyContext";

function ChatList(){

    const [chatPeoples,setPeoples] = useState([])
    const [people, setPeople] = useState([])
    const myData = useContext(UserContext)

    useEffect(async () => {
        const res = await axios.get("http://localhost:4000/chat/johndoe@email.com");
        const allinfo = []
        for (var i=0; i<(res.data).length; i++) {
            // data = {firstname: '', email: ''}
            allinfo.push((res.data)[i])
        }
        setPeoples(allinfo)
        // console.log(people)
    })

    const getChatroomTitle = (members) => {
        const myEmail = myData.user.email;
        const title = members[0] === myEmail ? members[1] : members[0];
        return title;
    }

    return(
        <div className = 'ChatList'>
            {/* <ChatPeople name = 'AA'/> */}
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