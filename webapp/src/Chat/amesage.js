import React,{useState} from "react"

function amesage({username,message,is_user}){
    if(is_user){
        return(
            <div className = "User_Message">
               {message}
            </div>
        );
    }else{
        return(
            <div className = "Iteracter_Message">
                {message}
            </div>
        );
    }
}
export default amesage;