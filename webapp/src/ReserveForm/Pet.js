import React, {useState} from 'react'
import PropTypes from 'prop-types'
import "./Pet.css";

function Pet({ info, CheckPet }) {
    const [click, setClick] = useState(false);
    function onClicked() {
            if(click) setClick(false);
            else setClick(true);
            console.log(!click);
            CheckPet(info._id);
    }
    let btn_class = click? "clickedButton" : "unclickedButton";
    return (
        <div className="Rpet">
            <img className="RPet__image" src={"https://pcsdimage.s3-us-west-1.amazonaws.com/" + info.owner + info._id} />
            <div className="col-5">
            <div className="RPet__name">{info.petName}, {info.age}, {info.gender} </div>
            </div>
            <button className={btn_class} onClick={onClicked}>✓</button>
        </div>
    )
}

Pet.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    deletePost: PropTypes.func.isRequired
};
export default Pet;
