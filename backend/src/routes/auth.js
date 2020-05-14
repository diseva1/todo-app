const router = require('express').Router();
const User = require('../models/User');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');

router.post('/register', async (req, res) => {

    //Validate the data
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check if the user is in the DB
    const userExist = await User.findOne({username: req.body.username});
    if(userExist) return res.status(400).send('Username already registered');
    

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
    const user = new User({
        username: req.body.username,
        password: hashPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    //Validate the data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if the user is in the DB
    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).send('Username is not found');
    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Pass is not found');

    //Create & assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('authToken', token).send(token);

});

module.exports = router;