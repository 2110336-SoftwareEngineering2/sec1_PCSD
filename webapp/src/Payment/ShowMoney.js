import React, { useContext } from "react";
import {Avatar} from "@material-ui/core";
import { UserContext } from "../context/MyContext";
import "./ShowMoney.css";
function ShowMoney() {
    const { user } = useContext(UserContext);

    return (
        <div className="showmoney">
            <div className="showheader">
                <h2>My account balance</h2>
            </div>
            <div className="showbody">
            <div className="user">
                    <Avatar
                        src={user.imgURL
                        }
                        />
                <div className="name">
                <span className="title">{user.firstname} {user.lastname}</span>
              </div>
            </div>
            <div className="content">
                <span className="pin ml-2">฿{user.balance.$numberDecimal}</span>
            </div>   
            </div>
    </div>
    )
}

export default ShowMoney
