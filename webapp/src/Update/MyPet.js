import React from 'react';
import Addpet from './AddPet';
import AddButton from "./Update_addButton";
import "./MyPet.css";
function MyPet(props) {
    return (
        <div className="mypet">
            <AddButton />
        </div>
    )
}

export default MyPet;