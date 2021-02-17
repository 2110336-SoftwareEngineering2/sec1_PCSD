import React, { Component } from 'react';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class LoginBox extends Component {
    static propTypes = {
      cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: '',
          loggin: false,
          user: '',
      };
      this.handleChageEmail = this.handleChageEmail.bind(this);
      this.handleChagePassword = this.handleChagePassword.bind(this);
    }


    async componentDidMount() {
      const { cookies } = this.props;
      const token = cookies.get("accessToken");
      if (cookies.get("accessToken") !== undefined) {
        this.setState({ loggin: true });
        const url = 'http://localhost:4000/auth/valid';
        const requestOptions = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        }
        const res = await fetch(url, requestOptions);
        const decoded = await res.json();
        this.setState({ user: decoded.email.email });
      }

        
    }
  
    async submitLogin(e) {
        const url = 'http://localhost:4000/auth/login'
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        };

        const res = await fetch(url, requestOptions).then(async (res) => {
            const data = await res.json();
            this.props.cookies.set("accessToken", data.accessToken, { path: "/" });
        }).catch(err => alert("Email or Password is incorrect, please login again"));
        console.log(res)
    }

    handleChageEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleChagePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
  
    render() {
      return (
        <div className="inner-container">
          <div className="header">
            Login
          </div>
          <div className="box">
  
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="email"
                className="login-input"
                onChange={this.handleChageEmail}
                placeholder="Email"/>
                
            </div>
  
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="login-input"
                onChange={this.handleChagePassword}
                placeholder="Password"/>
            </div>
  
            <button
              type="button"
              className="login-btn"
              onClick={this
              .submitLogin
              .bind(this)}>Login</button>
            
            <h3>{this.state.loggin == true ? `Hi ${this.state.user}, you are already logged in.` : 'you are not logged in.'}</h3>
          </div>
        </div>
      );
    }
  
  }
  
  export default withCookies(LoginBox);