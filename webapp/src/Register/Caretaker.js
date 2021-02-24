import React from "react";
import "./Caretaker.css"
import UserProfile from "./UserProfile";
import UserInfo from "./UserInfo"

//function Caretaker() {
//  return (
//      <div className="caretaker">
//          <UserProfile/>
//          <UserInfo infotype="Caretaker"/>
//      </div>
//  );
//}

class Caretaker extends React.Component {
    constructor(props) {
        super();
        this.state = {
            isNext: false,
            };
        this.profileControl = this.profileControl.bind(this);
    }
    
    profileControl() {
        this.setState({isNext: true});
    }
    
    render() {
        return(
            <div className="caretaker">
                  {this.state.isNext ? null : <UserProfile />}
                  <UserInfo func={this.profileControl} infotype="Caretaker"/>
            </div>
        );
    }
}

export default Caretaker;