import React,{useState} from "react"
import ChatList from "./Chat_List"
import SearchIcon from "@material-ui/icons/Search";

function Sidebar(){
    return(
        <div className = 'Sidebar'>
            <div className = 'Chat_Title'>Chats</div>
            <div className = "Searchbar">
                {/*<SearchIcon />   Diew Ma Sai Thee lang*/}
                <input className = "Search_input" placeholder = "Search Chat"></input>
            </div>
            <ChatList />
        </div>
    );
}
export default Sidebar;