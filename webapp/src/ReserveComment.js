import React, { useState, useEffect } from "react";
import "./ReserveComment.css";
import blankImage from "./userpic.png";
import Rating from '@material-ui/lab/Rating';

function ReserveComment(props) {
    return (
        <div className="reserve-comment">
            <div className="comment-rating">
                <Rating value={props.review.rate.$numberDecimal} precision={0.5} size="small" readOnly/>
            </div>
            <label>{props.review.comment == "" ? 
                <label className="no-comment">No comments</label> : props.review.comment}</label>
        </div>
    );
}

export default ReserveComment;