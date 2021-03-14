import React, {useState} from 'react'
import ChatPeople from "./Chat_People"
function ChatList(){

    const [chatPeoples,setPeoples] = useState([])

    return(
        <div className = 'ChatList'>
            <ChatPeople name = 'AA'/>
        </div>
    );
}
export default ChatList;