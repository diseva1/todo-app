const app = require('./app');
const { connect } = require('./db');
const port = process.env.PORT;

async function main() {
	//Database connection
	await connect();
	//Starts Express
	await app.listen(port, function () {
		console.log(`Server on port ${port}`);
	});
}

main();
