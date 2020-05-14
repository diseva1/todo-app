import React, { Component } from 'react';
import './App.css';

import { Router } from "react-router-dom";
import history from './services/history';
import Routes from './routes';


class App extends Component {
  componentDidMount() {
    this.setState({
      redirect: ''
    })
  }


  render() {
    return (
      <Router history={history}>
        <Routes />
      </Router>
    );
  }
}

export default App;
