import React from 'react'
import PropTypes from 'prop-types'

function ChatRoom({info}){
    return(
        <div className = "Chat_People">
            <img className = "People_Profile" src = "https://source.unsplash.com/random"/>
            <div className = "People_Name">{info.title}</div>
        </div>
    );
}
export default ChatRoom;