import React from 'react'
import PropTypes from 'prop-types'

function Pet({ id, name, deletePet }) {
    return (
        <div className="pet">
            <button className="Pet__delete" onClick={() => deletePet(id)}>X</button>
            <div className="Pet__name">{name}</div>
            <img className="Pet__image" src={`https://source.unsplash.com/random?sig=${id}`} />
        </div>
    )
}

Pet.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
};
export default Pet;
