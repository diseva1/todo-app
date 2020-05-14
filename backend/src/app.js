const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');


app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());


//Import Routes
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');


//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/tasks', tasksRoute);

module.exports = app;