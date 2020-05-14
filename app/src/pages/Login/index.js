import React, { Component } from 'react';
import '../../css/Login.css';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';
import history from '../../services/history';
import {Redirect, Link} from 'react-router-dom';




class Login extends Component {
  constructor(props) {
    super(props);
    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlerts = this.handleAlerts.bind(this);
    this.state = {
      counter: 0
    }
  }

  componentDidMount(){
    console.log(this.props.location.state);
    let counter = this.props.counter;
    counter ++;
    this.setState({
      counter: counter
    });
    let registerSuccess = localStorage.getItem('registerSuccess');
    if(registerSuccess){
      let alerts = document.getElementById('alerts-div');
      alerts.innerHTML = `
        <div class="alert alert-success" role="alert">
          You've been registered successfully
        </div>
      `
    }

  }

  handleAlerts() {
    let alerts = document.getElementById('alerts-div');
    alerts.innerHTML = `
      <div class="alert alert-success" role="alert">
        You've been registered successfully
      </div>
    `
  }

  handleInput(e) {
    const {value, id} = e.target;
    this.setState({[id]: value});
    
  } 

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if(this.state === null){
        console.log('incorrect');
        this.setState({loginform: "empty"})
    }
    axios({
        method: 'post',
        url: 'http://192.168.0.24:4000/api/user/login',
        data: {
            username: this.state.user,
            password: this.state.pass
        }
    })
    .then(function (response){
        if(response.status === 200){
            localStorage.removeItem('registerSuccess');
            localStorage.setItem('token', response.data);
            localStorage.setItem('signed', true);
            history.push('/');
        }
    });
  }
     
  render() {
    if(localStorage.getItem('signed')){
        return <Redirect to="/" />
    }
    /* if(this.props.location.state){
      if(this.props.location.state.registered){
        this.handleAlerts();
      }
    } */  

    return (
        <div className="login">
        <div className="heading">
          <h2>Login</h2>
          <div id="alerts-div"></div>
          <form onSubmit={this.handleSubmit}>
      
            <div className="input-group input-group-lg">
              <span className="input-group-addon"><i className="fa fa-user"></i></span>
              <input type="text" className="form-control" id="user" placeholder="Username" onChange={this.handleInput}/>
                </div>
      
              <div className="input-group input-group-lg" id="passForm">
                <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                <input type="password" className="form-control" id="pass" placeholder="Password" onChange={this.handleInput}/>
              </div>

              <Link to="/register" className="register-link">
                            You don't have an account? Sign Up
              </Link>
      
              <button type="submit" className="float">Login <FiLogIn /></button>
             </form>
               </div>
       </div>
    );
  }
}

export default Login;
