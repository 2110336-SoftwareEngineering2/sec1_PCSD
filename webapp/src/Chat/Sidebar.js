import React,{useState, useEffect} from "react"
import ChatList from "./Chat_List"
import axios from "axios"
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add"
import Button from '@material-ui/core/Button';


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
                <div className = 'Chat_Menu'>
                    <Button>+</Button>
                </div>
            </div>
            <div className = "Searchbar">
                {/*<SearchIcon />   Diew Ma Sai Thee lang*/}
                <input className = "Search_input" placeholder = "Search Chat" value = {searchContent} onChange = {onChange}></input>
            </div>
            <ChatList />
        </div>
    );
}
export default Sidebar;