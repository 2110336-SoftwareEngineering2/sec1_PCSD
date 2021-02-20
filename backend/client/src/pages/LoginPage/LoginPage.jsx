import React, { Component } from 'react'
import LoginBox from '../../components/LoginBox';
import './style.scss';

class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="login">
                <LoginBox />
                <h2><a href="/chat">Chat Page</a></h2>
            </div>
        );
    }
}

export default LoginPage;