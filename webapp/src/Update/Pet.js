import React from 'react'
import PropTypes from 'prop-types'
import "./Pet.css";

function Pet({ info, deletePet }) {
    console.log(info);
    return (
        <div className="pet">
            <img className="Pet__image" src={"https://pcsdimage.s3-us-west-1.amazonaws.com/" + info.owner + info._id} />
            <div className="col-5">
            <div className="Pet__name">{info.petName}, {info.age}, {info.gender} </div>
   
            </div>
            <button className="Pet__delete" onClick={() => deletePet(info._id)}>X</button>
        </div>
    )
}

Pet.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
};
export default Pet;
