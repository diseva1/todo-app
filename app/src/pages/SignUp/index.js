import React, { Component } from 'react';
import '../../css/Login.css';
import axios from 'axios';
import history from '../../services/history';
import {Redirect} from 'react-router-dom';

class SignUp extends Component {
  constructor() {
    super();
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    const {value, id} = e.target;
    this.setState({[id]: value});
    if({value, id} == null){
      this.setState({
        user: '',
        pass: ''
      });
    }
  } 

  handleSubmit(e) {
    e.preventDefault();
    if(this.state != null){
      axios({
        method: 'post',
        url: 'http://192.168.0.24:4000/api/user/register',
        data: {
            username: this.state.user,
            password: this.state.pass
        }
    })
    .then(function (response){
        if(response.status === 200){
            history.push({
              pathname: '/login',
              state: {registered: true}
            });
            localStorage.setItem('registerSuccess', true);
        }    
    })
    .catch(error  => {
      let resError = error.response.data;
      let alerts = document.getElementById('alerts-div');
      switch (resError) {
        case '"password" length must be at least 6 characters long':
          alerts.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Password length must be at least 6 characters long
            </div>
          `
          break;
        case 'Username already registered':
          alerts.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Username already registered
            </div>
          `
          break;
        case '"username" is not allowed to be empty':
          alerts.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Username field can't be empty
            </div>
          `
          break;
        case '"password" is required':
          alerts.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Password field can't be empty
            </div>
          `
          break;
        default:
          alerts.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Oh no! Something went wrong
            </div>
          `
          break;
      }
    });
   }
  }
     
  render() {
    if(localStorage.getItem('signed')){
        return <Redirect to="/" />
    }
    console.log(this.state);
    return (
        <div className="login">
        <div className="heading">
          <h2>Sign Up</h2>
          <div id="alerts-div"></div>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" id="user" className="form-control" placeholder="Username" onChange={this.handleInput}/>
            </div>
            <div className="input-group input-group-lg" id="passForm">
              <span className="input-group-addon"><i className="fa fa-lock"></i></span>
              <input type="password" id="pass" className="form-control" placeholder="Password" onChange={this.handleInput}/>
            </div>
            <button type="submit" className="float">Register</button>
            </form>
        </div>
        </div>
    );
  }
}

export default SignUp;
