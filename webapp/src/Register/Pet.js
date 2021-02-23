import React from 'react'
import PropTypes from 'prop-types'
import "./Pet.css";

function Pet({ id, name, deletePet }) {
    return (
        <div className="pet">
            <img className="Pet__image" src={`https://source.unsplash.com/random?sig=${id}`} />
            <div className="col-5">
            <div className="Pet__name">{name}, 10 months</div>
            <button className="Pet__edit">Edit</button>
            </div>
            <button className="Pet__delete" onClick={() => deletePet(id)}>X</button>
        </div>
    )
}

Pet.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
};
export default Pet;
