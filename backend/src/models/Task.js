const { Schema, model } = require('mongoose');
const User = require('../models/User');

const taskSchema = new Schema({
    title: String,
    description: String,
    priority: String,
    owner: {type: Schema.ObjectId, ref: "User"}
});

module.exports = model('Task', taskSchema);