import React from 'react';
import './App.scss';

/* Components */
import Navigation from './Components/Navigation';

/* Containers */
import TasksContainers from './Containers/Tasks';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Navigation />
				<ToDosContainer />
			</header>
		</div>
	);
}

export default App;
