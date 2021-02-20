import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./UserProfile.css";
import image from "./../userpic.png";
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {img: image};
        this.uploadImg = this.uploadImg.bind(this);
    }
    
    uploadImg(event) {
        const img = URL.createObjectURL(event.target.files[0]);
        this.setState({img: img});
    }
    
    render() {
        return(
            <div className="profile">
                <h3>Name</h3><br/>
                <label className="blacklabel">@username</label><br/>
                <img src={this.state.img}/><br/>
                <label className="inputfile">
                    Upload Your Photo <input type="file" accept="image/png, image/jpeg" onChange={this.uploadImg}/>
                </label>
                <div className="inputformat">
                    <label>Acceptable formats: <b className="blacklabel" >jpg, png</b> only</label><br/>
                    <label>Max file size is <b className="blacklabel">500 KB</b> and min size <b className="blacklabel">70 KB</b></label>
                </div>
                
            </div>
        );
    }
}