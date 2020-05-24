import React, { useState } from 'react';
import { addNewTask } from '../Containers/Tasks';

/* Material UI */
import { makeStyles } from '@material-ui/core/styles';
import {
	Fab,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Slide,
	Button,
	TextField,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Grid,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'absolute',
		bottom: theme.spacing(10),
		right: theme.spacing(6),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const AddTask = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [priority, setPriority] = useState('low');

	const handleChangeTitle = (event) => {
		setTitle(event.target.value);
	};
	const handleChangeDescription = (event) => {
		setDescription(event.target.value);
	};
	const handleChangePriority = (event) => {
		setPriority(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setOpen(false);
		addNewTask(title, description, priority);
		setTitle('');
		setDescription('');
		setPriority('low');
	};

	const openForm = () => {
		setOpen(true);
	};
	const closeForm = () => {
		setOpen(false);
		setTitle('');
		setDescription('');
		setPriority('low');
	};

	return (
		<div>
			<Fab
				variant='extended'
				color='primary'
				aria-label='add'
				className={classes.fab}
				onClick={openForm}
			>
				<AddIcon />
				Add task
			</Fab>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={closeForm}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
				fullWidth
				maxWidth='xs'
			>
				<DialogTitle id='alert-dialog-slide-title'>{'Add a new task'}</DialogTitle>
				<DialogContent>
					<form>
						<Grid container spacing={1} direction='column'>
							<Grid item>
								<TextField
									id='title'
									name='title'
									label='Title'
									variant='outlined'
									onChange={handleChangeTitle}
									value={title || ''}
									fullWidth
									required
								/>
							</Grid>
							<Grid item>
								<TextField
									id='description'
									name='description'
									label='Description'
									variant='outlined'
									onChange={handleChangeDescription}
									value={description || ''}
									fullWidth
								/>
							</Grid>
							<Grid item>
								<FormControl variant='outlined' fullWidth>
									<InputLabel id='priority-label'>Priority</InputLabel>
									<Select
										label='Priority'
										name='priority'
										labelId='priority-label'
										onChange={handleChangePriority}
										value={priority || ''}
									>
										<MenuItem value='low'>Low</MenuItem>
										<MenuItem value='medium'>Medium</MenuItem>
										<MenuItem value='high'>High</MenuItem>
									</Select>
								</FormControl>
							</Grid>
						</Grid>
					</form>
				</DialogContent>
				<DialogActions>
					<Button color='primary' onClick={handleSubmit}>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddTask;
