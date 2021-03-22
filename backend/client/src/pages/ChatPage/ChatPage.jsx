import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

class ChatPage extends Component {

    static propTypes = {
       cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
 
        this.state = {
            input: '',
            user: '',
            message: [],
            email: '',
            endpoint: "http://localhost:4000",
            roomId: this.props.match.params.id,
            roomDetail: {},
        }
    }

    componentDidMount = async() => {
        const { cookies } = this.props;
        const token = cookies.get('accessToken');
        if (token !== undefined || token !== null) {
            this.setState({ token : token });
            const url = 'http://localhost:4000/auth/valid';
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            }
            const res = await fetch(url, requestOptions);
            const decoded = await res.json();
            this.setState({ email: decoded.email.email });
            this.setFirstName(this.state.email);

            // get chatroom detail
            await this.getChatRoom(this.state.roomId);
            
            // response socket
            this.response();
        }
        else {
            window.alert("Please login !");
        }
    }

    getChatRoom = async (roomId) => {
        const url = `${this.state.endpoint}/chat/rooms/${roomId}`;
        const token = this.props.cookies.get('accessToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        this.setState({ roomDetail: data});
        this.setState({ message: data.messages })
    }

    setFirstName = async (email) => {
        const url = `http://localhost:4000/user/${this.state.email}`;
        const requestOptions = {
            method: 'GET',
            headers:  {
                'Content-Type': 'application/json'
            },
        }
        const res = await fetch(url, requestOptions);
        const data = await res.json();
        const firstname = data.firstname;
        this.setState({ user: firstname });
    }

    send = () => {
        const { endpoint, input, token, email } = this.state
        const socket = socketIOClient(endpoint, {
            query: {
                room: this.state.roomId
            }
        });
        if (token === undefined || token === null) window.alert("Cannot sent message, please login !");
        else {
            if (input.length !== 0) {
                const data = {
                    message: input,
                    user: this.state.user,
                    email: email,
                    token: token,
                    time: Date.now()
                }
                socket.emit('sent-message', data);
                this.setState({ input: '' });
            }
        }
        
    }

    response = () => {
        const { endpoint, message } = this.state
        const socket = socketIOClient(endpoint, {
            query: {
                "room": this.state.roomId
            }
        })
        socket.on('new-message-status', (res) => {
            message.push({user: res.user, message: res.message, email: res.email});
            if (res.status == false) {
                window.alert(res.message);
            } else {
                this.setState({ message: message });
            }
        });

        socket.on('exception', (err) => {
            throw (err)
        });
    }

    logout = () => {
        const { cookies } = this.props;
        cookies.remove('accessToken');
        window.alert('Logout success');
        this.setState({ user: ''});
    }

    changeInput = (e) => {
        this.setState({ input: e.target.value });
    }

    changeUsername = (e) => {
        this.setState({ username: e.target.value });
    }

    render() {
        const { input, message,  } = this.state
        return (
        <div>
            <div style={style}>
            <h2>Name : {this.state.user}</h2>
            <input value={input} onChange={this.changeInput} />
            <button onClick={() => this.send()}>Send</button>
            <button onClick={() => this.logout()}>Logout</button>

            </div>
            {
            message.map((data, i) =>
                <div key={i} style={style} >
                {`time : ${data.time} user: ${data.email}: ${data.message}`}
                </div>
            )
            }
        </div>
        )
    }
}
const style = { marginTop: 20, paddingLeft: 50 }


export default withCookies(ChatPage);