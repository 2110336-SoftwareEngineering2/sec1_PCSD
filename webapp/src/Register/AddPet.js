import React, { useState } from "react";
import "./Addpet.css";
import "./Register_info.css";
import image from "./../petpic.png";

function Addpet({addPetList, click}) {
    const [img, setImage] = useState(image);
    const [uploadImg, setUpload] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    function uploadImage(event) {
        const pic = URL.createObjectURL(event.target.files[0]);
        setImage(pic);
    }
    function onName(event){
        setName(event.target.value);
    }
    function onAge(event){
        setAge(event.target.value);
    }
    function onBreed(event){
        setBreed(event.target.value);
    }
    function onGender(gender){
        setGender(gender);
    }
    if(click){
        addPetList(name,img,age,breed,gender);
    }        
    return (
            <div className="addpet">
                <div className="picture">
                    <img src={img} />
                    <label id="uploadpic">
                        Upload Photo <input type="file" accept="image/png, image/jpeg" onChange={uploadImage} />
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
                                <input type="text" placeholder="Your Pet Name" onChange={onName} value= {name} ></input>
                            </div>
                            <div className="col-6">
                                <label>
                                    Breed
                                </label>
                                <input type="text" placeholder="Breed of you pet" onChange={onBreed} value= {breed}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label>
                                    Age
                                </label>
                                <input type="text" placeholder="Your Pet Age" onChange={onAge} value= {age}></input>
                            </div>
                            <div className="col-6">
                                <label>Gender</label><br /><br />
                                <RadioGender onGender={onGender} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default Addpet;

class RadioGender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedOption: null};
        this.onValueChange = this.onValueChange.bind(this);
        this.onGender = props.onGender;
    }
    
    onValueChange(event) {
        this.setState({selectedOption: event.target.value});
        this.onGender(event.target.value);
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
