import React, { useState } from 'react';

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Button,
	Typography,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='down' ref={ref} {...props} />;
});

export const confirmDelete = (id, title) => {
	console.log(id);
	console.log(title);
};

const DeleteTask = (props) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<DialogTitle id='alert-dialog-slide-title'>{'Please Confirm'}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						Are you sure that you want to delete the following task?
					</DialogContentText>
					<Typography color='error' variant='h6' align='center'>
						Test Task
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='secondary'>
						Delete
					</Button>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default DeleteTask;
