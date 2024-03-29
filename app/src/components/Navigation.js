import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import '../App'
import history from '../services/history';

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
      <nav className="navbar fixed-top navbar-dark bg-dark">
      <a 
        className="navbar-brand"
        href="/"
      >
        <img src={logo} className="App-logo" alt="logo" />
        To-Do
        <span> </span>
        <span className="badge badge-secondary">{ this.props.remainingTasks }</span>
      </a>
      <button className="btn btn-warning" onClick={this.logOut}> Log Out</button>
    </nav>
  );
  }
}
  
  export default Navigation;