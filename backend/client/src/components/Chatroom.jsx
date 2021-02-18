import React, { Component } from 'react'

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomId: this.props.roomId,
        }
    }

    render() {
        return (
            <div className="chatroom">
                <h4><a href={`/chat/room/${this.state.roomId}`}>{this.state.roomId}</a></h4>
            </div>
        )
    }
}

export default Chatroom;