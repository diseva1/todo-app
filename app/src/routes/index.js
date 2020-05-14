import React from 'react';
import { Switch } from 'react-router-dom';
/* import Route from './Route' */
import {Route} from 'react-router-dom';
import Login from '../pages/Login';
import Tasks from '../pages/Tasks';
import SignUp from '../pages/SignUp';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Tasks} isPrivate />
      <Route path="/login" component={Login} /> {/* add isPrivate to make a page private */}
      <Route path="/register" component={SignUp} />
      
      {/* If page not found redirects to tasks page */}
      <Route component={Tasks} /> 
    </Switch>
  );
}