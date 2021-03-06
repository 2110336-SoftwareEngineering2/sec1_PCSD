import React,{useState, useEffect} from "react"
import ChatList from "./Chat_List"
import SearchIcon from "@material-ui/icons/Search";



function Sidebar(){
    const [searchContent,setSearch] = useState('')

    function onChange(event){
        setSearch(event.target.value)
    }

    return(
        <div className = 'Sidebar'>
            <div className = 'Sidebar_Head'>
                <div className = 'Chat_Title'>
                    Chat
                </div>
                
            </div>
            {/*<div className = "Searchbar">
                <SearchIcon className = "SearchIcon" /> 
                <input className = "Search_input" placeholder = "Search Chat" value = {searchContent} onChange = {onChange}></input>
            </div>*/}
            <ChatList  />
        </div>
    );
}
export default Sidebar;