import React, { useState, useEffect } from "react";
import "./ReserveComment.css";
import blankImage from "./userpic.png";
import Rating from '@material-ui/lab/Rating';

function ReserveComment(props) {
    return (
        <div className="reserve-comment">
            <div className="comment-rating">
                <Rating value={5} precision={0.5} size="small" readOnly/>
            </div>
            <label>{props.comment.text == "" ? 
                <label className="no-comment">No comment</label> : props.comment.text}</label>
        </div>
    );
}

export default ReserveComment;