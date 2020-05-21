import React, { Component } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

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
        
        <Card 
            bg="light"
            style={{ width: '24rem' }}
        >
            <Card.Header as="h1">Add Task</Card.Header>
            <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <input 
                            type="text"
                            name="title"
                            onChange={this.handleInput}
                            className="form-control"
                            placeholder="Title" 
                        />
                    </Form.Group>
                    <Form.Group>
                        <input 
                            type="text"
                            name="description"
                            onChange={this.handleInput}
                            className="form-control"
                            placeholder="Description" 
                        />
                    </Form.Group>
                    <Form.Group>
                    <select 
                        name="priority"
                        onChange={this.handleInput}
                        className="form-control"
                    >
                        <option>low</option>
                        <option>medium</option>
                        <option>high</option>
                    </select>
                    </Form.Group>
                    <input 
                type="submit" 
                className="btn btn-info mb-3" 
                value="Save"
            />
                </Form>
            </Card.Body>
        </Card>
        
     )
    }
}

export default AddForm;