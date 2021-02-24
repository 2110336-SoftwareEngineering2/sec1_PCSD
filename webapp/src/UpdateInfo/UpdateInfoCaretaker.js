import React, {useState} from 'react'
import "./UpdateInfoCaretaker.css";
import Header from "../Header/header";
import UpdateUserProfile from "./UpdateUserProfile";
function UpdateInfoCaretaker({uInfo}) {
    const [isNext, setIsNext] = useState(false);
      const profileControl = () => {
        setIsNext(true);
      };
    return (
        <div className="caretaker__updateinfo">
            <Header />
            {isNext ? null : <UpdateUserProfile />}
        </div>
    )
}

export default UpdateInfoCaretaker;
