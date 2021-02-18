import React, { Component } from 'react'

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.roomId,
            members: this.props.members
        }
    }

    render() {
        return (
            <div className="chatroom">
                <h4><a href={`/chat/room/${this.state.roomId}`}>{this.state.roomId}</a> members: {this.state.members[0]} {this.state.members[1]}</h4>
            </div>
        )
    }
}

export default Chatroom;