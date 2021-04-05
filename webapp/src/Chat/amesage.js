import React,{useState} from "react"
import {Avatar} from "@material-ui/core"

function Amesage({email,message,timestamp,is_user}){
    if(is_user){
        return(
            <div className = "User_Message4">
            <div className = "User_Message">
                <div className = "User_Message3">
                    <Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + email} />
                    <div className = "User_Message2">
                        <div>{email+"  "+timestamp}</div>
                        <div>{message}</div>
                    </div>
                </div>
            </div>
            </div>
        );
    }else{
        return(
            <div className = "Interacter_Message">
                <div className = "Interacter_Message3">
                    <Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + email} />
                    <div className = "Interacter_Message2">
                        <div>{email+"  "+timestamp}</div>
                        <div>{message}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Amesage;