import React from 'react';
import '../scss/ToDos.scss';
import { confirmDelete } from './DeleteTask';

import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	Divider,
	Typography,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	card: {
		marginLeft: theme.spacing(2),
	},
	button: {
		display: 'block',
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(3),
	},
}));

const ToDos = (props) => {
	const classes = useStyles();

	const deleteCard = (id, title) => {
		confirmDelete(id, title);
	};

	const todos = props.todos.map((todo, index) => {
		var priorityStyle;
		switch (todo.priority) {
			case 'high':
				priorityStyle = 'todo-priority priority-high';
				break;
			case 'medium':
				priorityStyle = 'todo-priority priority-medium';
				break;
			case 'low':
				priorityStyle = 'todo-priority priority-low';
				break;
			default:
				priorityStyle = 'todo-priority priority-low';
				break;
		}
		return (
			<Grid item xs={12} sm={3} key={index}>
				<Card className={classes.card}>
					<CardHeader title={todo.title} />
					<Divider variant='middle' />
					<CardContent>
						<p className={priorityStyle}>{todo.priority}</p>
						<Typography>{todo.description}</Typography>
					</CardContent>
					<Divider variant='middle' />
					<Button
						color='secondary'
						variant='outlined'
						className={classes.button}
						onClick={() => deleteCard(todo._id, todo.title)}
					>
						Delete
					</Button>
				</Card>
			</Grid>
		);
	});
	return (
		<div>
			<Grid container spacing={1} style={{ marginTop: '2rem' }}>
				<Grid container item xs={12} sm={12} spacing={3} justify='center'>
					{todos}
				</Grid>
			</Grid>
		</div>
	);
};

export default ToDos;
