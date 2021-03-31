import React,{useState} from "react"

function Amesage({email,message,timestamp,is_user}){
    if(is_user){
        return(
            <div className = "User_Message">
               {email}
               {message}
               {timestamp}
            </div>
        );
    }else{
        return(
            <div className = "Iteracter_Message">
               {email}
               {message}
               {timestamp}
            </div>
        );
    }
}
export default Amesage;