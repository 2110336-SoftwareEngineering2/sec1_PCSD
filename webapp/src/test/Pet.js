import React from 'react'

function Pet({info}) {
    return (
        <div className="tpet">
        <img className="RPet__image" src={info.imgURL} />
        <div className="col-5">
          <div className="RPet__name">
            {info.petName}, {info.age}, {info.gender}{" "}
          </div>
        </div>
      </div>
    )
}

export default Pet
