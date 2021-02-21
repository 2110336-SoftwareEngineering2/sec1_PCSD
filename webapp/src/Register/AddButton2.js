import React, { Component } from "react";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import "./AddButton.css";
export default class AddButton2 extends React.Component {
    constructor(props) {
        super();
        this.state = {isNext: false};
        this.clickedAdd = this.clickedAdd.bind(this);
    }
    
    clickedAdd(event) {
        this.setState({isNext: true});
    }
    render() {
        return(
            <div>
                {!this.state.isNext ? <SumPet /> : <AddPet/> }
                {!this.state.isNext ? 
                 <div className="addbutton">
                    <button className="submit" onClick={this.clickedAdd}>Add Pet</button>
                 </div> : null}
            </div>
        );
    }
}