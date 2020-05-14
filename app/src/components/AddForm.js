import React, { Component } from 'react';
import axios from 'axios';

class AddForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            priority: 'low'
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        const {value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddTodo(this.state);
        console.log("sending data");

        var sendingData = this.state;
        axios({
            method: 'post', 
            url:'http://192.168.0.24:4000/api/tasks/add',
            data: sendingData,
            headers:{
                authToken: localStorage.getItem('token')
            }
        })
        .then(function (response){
            console.log(response);
        });
    }

    render () {
     return(
        <div className="card" id="addTaskCard" >
         <div className="card-header">
            <h1>Add Task</h1>
         </div>
         <form className="card-body" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <input 
                    type="text"
                    name="title"
                    onChange={this.handleInput}
                    className="form-control"
                    placeholder="Title" 
                />
            </div>
            <div className="form-group">
            <input 
                type="text"
                name="description"
                onChange={this.handleInput}
                className="form-control"
                placeholder="Description" 
                />
            </div>
            <div className="form-group">
            <select 
                name="priority"
                onChange={this.handleInput}
                className="form-control"
                >
                    <option>low</option>
                    <option>medium</option>
                    <option>high</option>
                </select>
            </div>
            <input 
                type="submit" 
                className="btn btn-info mb-3" 
                value="Save"
            />
         </form>
        </div>
     )
    }
}

export default AddForm;