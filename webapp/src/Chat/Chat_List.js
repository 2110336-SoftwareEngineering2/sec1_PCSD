import React, {useState, useEffect} from 'react'
import axios from "axios"
import ChatPeople from "./Chat_People"
function ChatList(){

    const [chatPeoples,setPeoples] = useState([])
    const [people, setPeople] = useState([])

    useEffect(async () => {
        const res = await axios.get("http://localhost:4000/user/fnames");
        const names = []
        for (var i=0; i<(res.data).length; i++) {
            names.push((res.data)[i].firstname)
        }
        setPeople(names)
        console.log(people)
    })

    return(
        <div className = 'ChatList'>
            {/* <ChatPeople name = 'AA'/> */}
            {people.map((fname, idx) => {
                return (<ChatPeople name={fname} key={idx} />)
            })}
        </div>
    );
}
export default ChatList;