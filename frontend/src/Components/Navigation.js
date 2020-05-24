import React from 'react';
import logo from '../logo.svg';
import '../scss/Navigation.scss';

import { AppBar, Typography, Toolbar, Button, Grid, Badge } from '@material-ui/core';

const Navigation = (props) => {
	const remainingTasks = props.tasks;
	return (
		<AppBar position='static'>
			<Grid container justify='space-between'>
				<Grid item>
					<Toolbar>
						<img src={logo} className='App-logo' alt='logo' />
						<Badge badgeContent={remainingTasks} color='error'>
							<Typography variant='h5'>To-Do</Typography>
						</Badge>
					</Toolbar>
				</Grid>
				<Grid item>
					<Toolbar>
						<Button color='secondary' variant='outlined' mr={2}>
							LOGOUT
						</Button>
					</Toolbar>
				</Grid>
			</Grid>
		</AppBar>
	);
};

export default Navigation;
