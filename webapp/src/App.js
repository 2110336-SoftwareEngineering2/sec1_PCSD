import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    console.log('render email', email);
    
  return (
      <div className="container my-4">
      <div className="row">
      <div className="col12 col-md-8 offset-md-2">
    <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" 
      className="form-control" 
      id="exampleInputEmail1" 
      aria-describedby="emailHelp" 
      onchange={(e) => setEmail(e.target.value)} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" 
    onchange={(e) => setPass(e.target.value)}
/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Remember Me</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
      </div>
      </div>
  );
}

export default App;
