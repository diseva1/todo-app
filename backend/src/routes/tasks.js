const { Router } = require('express');
const router = Router();

const verify = require('../verifyToken');

const Task = require('../models/Task');

router.get('/', verify, async (req, res) => {
	const todos = await Task.find({ owner: req.user._id });
	var taskQuantity = await Task.countDocuments({ owner: req.user._id });
	res.json({
		taskNumber: taskQuantity,
		todos: todos,
		user: req.user,
	});
});

router.post('/add', verify, async (req, res) => {
	var data = req.body;
	res.json({ message: 'Post request made', data: data });
	await Task.create({
		title: data.title,
		description: data.description,
		priority: data.priority,
		owner: req.user._id,
	});
});

router.delete('/delete', verify, async (req, res) => {
	var data = req.body;
	var deleted;
	const checkOwner = await Task.find({ owner: req.user._id });
	for (var i = 0; i < checkOwner.length; i++) {
		if (checkOwner[i]._id === data.id) {
			await Task.findByIdAndDelete(data.id, async (err, res) => {
				if (res) {
					console.log('Success');
					deleted = true;
				} else {
					deleted = false;
				}
			});
		}
	}
	res.json({ message: 'Delete request made', deleted: deleted });
});

module.exports = router;
