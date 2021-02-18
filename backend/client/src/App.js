import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ChatPage from './pages/ChatPage/ChatPage';
import LoginPage from './pages/LoginPage/LoginPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_from: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }

  render() {

    return (
      <div className="App">
        <Router>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <Route exact path='/chat'>
            <ChatPage />
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;