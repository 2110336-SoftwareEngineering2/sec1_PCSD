import React,{useState} from "react"
//import {Avatar} from "@material-ui/core"
//import axios from "axios";
function Amesage({email,message,timestamp,is_user}){
    /*const [firstname, setFname] = useState("");
    const [lastname, setLname] = useState("");
    axios
        .post("http://localhost:4000/user/email", {email: email})
        .then((res) => {
            console.log(res);
            const data = res.data;
            setFname(data.firstname);
            setLname(data.lastname);
            })
        .catch((err) => {
            console.log(err);
            });
    */
    if(is_user){
        return(
            <div className = "User_Message4">
                {//<Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + email} />
                }
            <div className = "User_Message">
                <div className = "User_Message3">
                    
                    <div className = "User_Message2">
                        <div>{timestamp}</div>
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
                    {//<Avatar className = "ChatAvatar" src = {"https://pcsdimage.s3-us-west-1.amazonaws.com/" + email} />
                    }
                    <div className = "Interacter_Message2">
                        <div>{timestamp}</div>
                        <div>{message}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Amesage;