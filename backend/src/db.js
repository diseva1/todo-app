const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function connect(){
    await mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connected to the database');
}

module.exports = { connect };