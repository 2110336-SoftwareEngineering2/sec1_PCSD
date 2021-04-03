import React,{useState} from "react"
import {Avatar} from "@material-ui/core"

function Amesage({email,message,timestamp,is_user}){
    if(is_user){
        return(
            <div className = "User_Message">
                <Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + email} />
                <div>{email}</div>
                <div>{message}</div>
                <div>{timestamp}</div>
            </div>
        );
    }else{
        return(
            <div className = "Iteracter_Message">
                <Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + email} />
                <div>{email}</div>
                <div>{message}</div>
                <div>{timestamp}</div>
            </div>
        );
    }
}
export default Amesage;