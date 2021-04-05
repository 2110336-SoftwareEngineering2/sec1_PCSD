import React from 'react'
import PropTypes from 'prop-types'
import "./Pet.css";
import {Avatar} from "@material-ui/core";
function Pet({ info, deletePet }) {
    return (
        <div className="pet">
            <Avatar className="Pet__image" src={info.img} />
            <div className="col-5">
            <div className="Pet__name">{info.name}, {info.age}, {info.gender} </div>
   
            </div>
            <button className="Pet__delete" onClick={() => deletePet(info.id)}>X</button>
        </div>
    )
}

Pet.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
};
export default Pet;
