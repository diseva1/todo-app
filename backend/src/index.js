const app = require('./app');
const { connect } = require('./db');

async function main() {
    //Database connection
    await connect();  
    //Starts Express
    await app.listen(4000, function() {
    console.log('Server on port 4000');
});
  
}

main();




