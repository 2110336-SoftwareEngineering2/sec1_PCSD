import React, { Component } from "react";
import "./Addpet.css";
import image from "./../petpic.png";

export default class Addpet extends React.Component {
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
            <div className="addpet">
                <div className="picture">
                <img src={this.state.img}/>
                <label id="uploadpic">
                    Upload Photo <input type="file" accept="image/png, image/jpeg" onChange={this.uploadImg}/>
                </label>
                </div>
                <div className="pettype">
                        <div className="row">
                        <label>Pet Type</label><br/>
                            <div className="col-3">
                                <label>
                                    <input type="checkbox" value="dog"/>  Dog
                                </label><br/>
                                <label>
                                    <input type="checkbox" value="cat"/>  Cat
                                </label><br/>
                                <label>
                                    <input type="checkbox" value="rabbit"/>  Rabbit
                                </label>
                            </div>
                            <div className="col-4">
                                <label>
                                    <input type="checkbox" value="bird"/>  Bird
                                </label><br/>
                                <label>
                                    <input type="checkbox" value="hamster"/>  Hamster
                                </label><br/>
                                <label>
                                    <input type="checkbox" value="turtle"/>  Turtle
                                </label>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}