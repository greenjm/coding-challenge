const express = require('express');

const start = (port) => {
	const app = express();

	app.get('/', (req, res) => {
		res.send('Hello World');
	});
	
	const server = app.listen(port);
	console.log('Product API started on port:', port);

	return server;
};

module.exports = { start };