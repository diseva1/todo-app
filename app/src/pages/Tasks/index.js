import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import '../../css/Tasks.css'
import {Redirect} from 'react-router-dom';

import Navigation from '../../components/Navigation';
import AddForm from '../../components/AddForm';


class Tasks extends Component {
  constructor() {
    super(); 
    this.state = {
      todos: [
        {
            "title": "",
            "description": "",
            "priority": "",
            "_id": ""
        }
    ],
    remainingTasks: 0,
    idToDelete: ''
    } 
    this.handlerAddTodo = this.handlerAddTodo.bind(this);
  } 

  componentDidMount() {
    axios({
      method: 'get', 
      url: 'http://192.168.0.24:4000/api/tasks', 
      headers:{
        authToken: localStorage.getItem('token')
      }})
      .then(res => {
        this.setState({
          todos: res.data.todos,
          remainingTasks: res.data.taskNumber
        })
        console.log(this.state.todos);
      });   
  }

  handlerAddTodo(todo) {
    this.setState({
        todos: [...this.state.todos, todo],
        remainingTasks: this.state.remainingTasks + 1
    });
  }

  confirmRemoveTodo(id){
    console.log('Id to remove:');
    console.log(id);
    this.setState({
      idToDelete: id
    })
  }

  removeTodo(e){
    var deleteTodo = this.state.todos.filter(
      function(todos){
        return todos._id !== e 
      }
    );
    this.setState({
      todos: deleteTodo,
      remainingTasks: this.state.remainingTasks - 1
    });
    axios({
      method: 'delete', 
      url:'http://192.168.0.24:4000/api/tasks/delete',
      data: {id: this.state.idToDelete},
      headers:{
        authToken: localStorage.getItem('token')
      }
    })
     .then(function (response){
      console.log(response);
      window.$("#confirmDelete").modal("hide");
    });  
  }

  render() {
    if(!localStorage.getItem('signed')){
      return <Redirect to="/login" />
    }

    const todos = this.state.todos.map((todo, index) => {
      var priorityStyle;
      if(todo.priority === "low"){
        priorityStyle = "badge badge-pill badge-success ml-2"
      }else if(todo.priority === "medium"){
        priorityStyle = "badge badge-pill badge-warning ml-2"
      }else if(todo.priority === "high"){
        priorityStyle = "badge badge-pill badge-danger ml-2"
      }
    return (
      <div className="card card-sm mt-3 mb-4" id="taskCards" key={index}> 
        <div className="card-header">
          <h3>{todo.title}</h3>
          <span className={priorityStyle}>
            {todo.priority}
          </span>
        </div>
        <div className="card-body">
         <p>{todo.description}</p>
        </div>
        <div className="card-footer">
          <button 
           className="btn btn-danger" 
           data-toggle="modal"
           data-target="#confirmDelete"
           onClick={this.confirmRemoveTodo.bind(this, todo._id)}
           >
             Delete
           </button>
        </div>
        {/* Creation of the modal */}
        <div className="modal fade" id="confirmDelete" tabIndex="-1" role="dialog" aria-hidden="true" key={index}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Please Confirm</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure that you want to delete this task? 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={this.removeTodo.bind(this, this.state.idToDelete)} >Confirm</button>
              <button type="button" className="btn btn-success" data-dismiss="modal">Cancel</button> 
            </div>
          </div>
        </div>
      </div>
    </div>  
    );
  });  

    return (
      <div className="App">
      <header className="App-header">
        <Navigation remainingTasks={ this.state.remainingTasks }/>
        <div className="Container">
          <div className="row">
            <div className="col-2 mt-4" id="addTask">
              <AddForm onAddTodo={this.handlerAddTodo}/>
            </div>
            <div className="col mt-4">
              { todos }
            </div>
          </div> 
        </div>
      </header>
    </div>
    );
  }
}

export default Tasks;
