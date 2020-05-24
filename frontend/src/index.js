import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import TasksContainer from './Containers/Tasks';
import * as serviceWorker from './serviceWorker';
import 'typeface-roboto';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<Route path='/' exact component={TasksContainer} />
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
