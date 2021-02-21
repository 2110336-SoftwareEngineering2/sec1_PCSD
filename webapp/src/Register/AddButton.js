import React, { Component } from "react";
import AddPet from "./AddPet";
import SumPet from "./SumPet";
import "./AddButton.css";
export default class AddButton extends React.Component {
    constructor(props) {
        super();
        this.state = {isNext: false};
        this.clickedNext = this.clickedAdd.bind(this);
    }
    
    clickedAdd(event) {
        this.setState({isNext: true});
    }
    render() {
        return(
            <div>
                {!this.state.isNext ? <AddPet /> : <SumPet/> }
                {!this.state.isNext ? 
                 <div className="addbutton">
                    <button className="submit" onClick={this.clickedNext}>Add Pet</button>
                 </div> : null}
            </div>
        );
    }
}