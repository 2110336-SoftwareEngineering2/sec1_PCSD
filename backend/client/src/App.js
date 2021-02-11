import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor() {
    super()

    this.state = {
      input: '',
      username: '',
      message: [],
      endpoint: "http://localhost:4000" // connect to url socket server
    }
  }

  componentDidMount = () => {
    this.response()
  }

  send = (message) => {
    const { endpoint, input } = this.state
    const socket = socketIOClient(endpoint)
    const data = `${this.state.username}: ${this.state.input}`;
    socket.emit('sent-message', data);
    this.setState({ input: '' });
  }

  response = () => {
    const { endpoint, message } = this.state
    const temp = message
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      temp.push(messageNew)
      this.setState({ message: temp })
    })
  }

  changeInput = (e) => {
    this.setState({ input: e.target.value });
  }

  changeUsername = (e) => {
    this.setState({ username: e.target.value });
  }

  render() {
    const { input, message } = this.state
    return (
      <div>
        <div style={style}>
          <h2>Username : {this.state.username}</h2>
          <input value={this.state.username} onChange={this.changeUsername} />
          <br />
          <input value={input} onChange={this.changeInput} />
          <button onClick={() => this.send()}>Send</button>

        </div>
        {
          message.map((data, i) =>
            <div key={i} style={style} >
              {data}
            </div>
          )
        }
      </div>
    )
  }
}

const style = { marginTop: 20, paddingLeft: 50 }

export default App