import React, { Component } from 'react';
import logo from '../logo.svg';
/* import '../App.css'; */
import '../App'
import history from '../services/history';

import Navbar from 'react-bootstrap/Navbar';

class Navigation extends Component{
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    localStorage.clear();
    history.push('/login');
  }

  render(){
    return (
      <Navbar bg="dark"> 
      <Navbar.Brand 
        href="/"
      >
        <img src={logo} className="App-logo" alt="logo" />
        To-Do
        <span> </span>
        <span className="badge badge-secondary">{ this.props.remainingTasks }</span>
      </Navbar.Brand>
      <button className="btn btn-warning" onClick={this.logOut}>Log Out</button>
    </Navbar>
  );
  }
}
  
  export default Navigation;