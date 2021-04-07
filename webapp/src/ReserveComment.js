import React, { useState, useEffect } from "react";
import "./ReserveComment.css";
import blankImage from "./userpic.png";
import Rating from '@material-ui/lab/Rating';

function ReserveComment(props) {
    const img = "https://pcsdimage.s3-us-west-1.amazonaws.com/"+ "cat_taker@sthmail.com";

    return (
        <div className="reserve-comment">
            <div className="row">
                <div className="col--2 comment_img">
                    <img className="commentimg" src={img} alt={blankImage}/>
                </div>
                <div className="col--10">
                    <label className="comment-username">@username</label><br/>
                    <div className="comment-rating">
                        <Rating value={5} precision={0.5} size="small" readOnly/>
                    </div>
                    <label className="comment-comment">comments comments comments</label>
                </div>
            </div>
        </div>
    );
}

export default ReserveComment;