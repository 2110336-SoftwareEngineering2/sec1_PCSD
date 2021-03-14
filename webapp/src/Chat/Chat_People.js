import React from 'react'
import PropTypes from 'prop-types'

function ChatPeople({name}){
    return(
        <div className = "Chat_People">
            <img className = "People_Profile" src = "https://source.unsplash.com/random"/>
            <div className = "People_Name">{name}</div>
        </div>
    );
}
export default ChatPeople;