import React, { useState, useEffect } from 'react';
import '../scss/ToDos.scss';

/* Components */
import Navigation from '../Components/Navigation';
import ToDos from '../Components/ToDos';
import AddTask from '../Components/AddTask';
import DeleteTask from '../Components/DeleteTask';

/* Material UI */
import { CircularProgress } from '@material-ui/core';

/* API */
import axios from 'axios';
export const apiRoute = 'http://192.168.0.24:4000';

export const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWFmMmZlZmJhZmYwOTNhMDQ1ZTdlN2EiLCJpYXQiOjE1OTAwODUwMzN9.Wph6J52tPh7DoxFyMzXEXvhUm2x2TQwJ9OEE0eNnI-0';

export const addNewTask = (title, description, priority) => {
	axios({
		method: 'post',
		url: `${apiRoute}/api/tasks/add`,
		data: {
			title: title,
			description: description,
			priority: priority,
		},
		headers: {
			authToken: token,
		},
	}).then(function (response) {
		console.log(response);
	});
};

const TasksContainer = (props) => {
	const [remainingTasks, setRemainingTasks] = useState(0);
	const [receivedTodos, setReceivedTodos] = useState('');
	const [load, setLoad] = useState(false);

	useEffect(() => {
		axios({
			method: 'get',
			url: `${apiRoute}/api/tasks`,
			headers: {
				/* authToken: localStorage.getItem('token') */
				authToken: token,
			},
		}).then((res) => {
			console.log(res.data);
			setRemainingTasks(res.data.taskNumber);
			setReceivedTodos(res.data.todos);
			setLoad(true);
		});
	}, []);

	if (load) {
		return (
			<div className='tasks-container'>
				<div className='tasks-header'>
					<Navigation tasks={remainingTasks} />
				</div>
				<div className='tasks-body'>
					<ToDos todos={receivedTodos} />
					<AddTask />
					<DeleteTask />
				</div>
			</div>
		);
	} else {
		return (
			<div className='tasks-container'>
				<div className='tasks-header'>
					<Navigation tasks={remainingTasks} />
				</div>
				<div className='tasks-body'>
					<CircularProgress className='loading-icon' />
					<AddTask />
				</div>
			</div>
		);
	}
};

export default TasksContainer;
