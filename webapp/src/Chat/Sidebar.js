import React,{useState, useEffect} from "react"
import ChatList from "./Chat_List"
import axios from "axios"
import SearchIcon from "@material-ui/icons/Search";

function Sidebar(){
    const [searchContent,setSearch] = useState('')

    function onChange(event){
        setSearch(event.target.value)
    }

    return(
        <div className = 'Sidebar'>
            <div className = 'Chat_Title'>Chats</div>
            <div className = "Searchbar">
                {/*<SearchIcon />   Diew Ma Sai Thee lang*/}
                <input className = "Search_input" placeholder = "Search Chat" value = {searchContent} onChange = {onChange}></input>
                <h1>Hello 12</h1>
            </div>
            <ChatList />
        </div>
    );
}
export default Sidebar;