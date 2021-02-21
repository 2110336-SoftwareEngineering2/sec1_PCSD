import React, { Component } from "react";
import "./Addpet.css";
import "./Register_info.css";
import image from "./../petpic.png";

export default class Addpet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { img: image };
        this.uploadImg = this.uploadImg.bind(this);
    }

    uploadImg(event) {
        const img = URL.createObjectURL(event.target.files[0]);
        this.setState({ img: img });
    }

    render() {
        return (
            <div className="addpet">
                <div className="picture">
                    <img src={this.state.img} />
                    <label id="uploadpic">
                        Upload Photo <input type="file" accept="image/png, image/jpeg" onChange={this.uploadImg} />
                    </label>
                </div>
                <div className="pettype">
                    <label>Pet Type</label><br />
                    <div className="row">
                        <div className="col-2" id="type">
                            <label>
                                <input type="checkbox" value="dog" />  Dog
                                </label><br />
                            <label>
                                <input type="checkbox" value="cat" />  Cat
                                </label>
                        </div>
                        <div className="col-2" id="type">
                            <label>
                                <input type="checkbox" value="rabbit" />  Rabbit
                                </label><br />
                            <label>
                                <input type="checkbox" value="bird" />  Bird
                                </label>
                        </div>
                        <div className="col-3" id="type">
                            <label>
                                <input type="checkbox" value="hamster" />  Hamster
                                </label><br />
                            <label>
                                <input type="checkbox" value="turtle" />  Turtle
                                </label>
                        </div>
                    </div>
                </div>
                <div className="pet__info">
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    Pet Name
                                </label>
                                <input type="text" placeholder="Your Pet Name"></input>
                            </div>
                            <div className="col-6">
                                <label>
                                    Breed
                                </label>
                                <input type="text" placeholder="Breed of you pet"></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    Age
                                </label>
                                <input type="text" placeholder="Your Pet Age"></input>
                            </div>
                            <div className="col-6">
                                <label>Gender</label><br /><br />
                                <RadioGender  />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

class RadioGender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: null};
        this.onValueChange = this.onValueChange.bind(this);
    }
    
    onValueChange(event) {
        this.setState({selectedOption: event.target.value});
    }
    
    render() {
        return(
            <div>
                <label className="radio">
                    Female&nbsp;<input 
                              type="radio" 
                              value="female" 
                              checked={this.state.selectedOption === "female"} 
                              onChange={this.onValueChange}/>
                </label>
                &nbsp;
                <label className="radio">
                    Male&nbsp;<input 
                            type="radio" 
                            value="male" 
                            checked={this.state.selectedOption === "male"} 
                            onChange={this.onValueChange}/>
                </label>
            </div>
        );
    }
}