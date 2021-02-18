import React, { Component } from 'react';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Chatroom from '../../components/Chatroom';

class ChatHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            email: '',
        }
    }

    async componentDidMount() {
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

            // get chatroom detail
            await this.getMyChatrooms();
            
        }
        else {
            window.alert("Please login !");
        }
    }

    async getMyChatrooms() {
        const { cookies } = this.props;
        const token = cookies.get('accessToken');
        const url = 'http://localhost:4000/chat/' + this.state.email;
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
        const res = await fetch(url, requestOptions);
        const data = await res.json()
        var tmp = [];
        for (var i=0; i<data.length; i++) {
            tmp.push(data[i]._id);
        }
        this.setState({ rooms: tmp });
        console.log(this.state.rooms)
    }

    render() {
        return (
            <div>
                <h1>My chat rooms: </h1>
                <br />
                {
                    this.state.rooms.map((id, i) =>
                        <Chatroom key={i} roomId={id}/>
                    )
                }
            </div>
        )
    }
}

export default withCookies(ChatHome);