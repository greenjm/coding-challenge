const cors = require('cors');
const express = require('express');
const ProductController = require('./controllers/ProductController');

const start = (port) => {
	const app = express();
	require('./db');

	// Middleware
	app.use(cors({
		origin: '*',
	}));
	app.use(express.json());

	// Controllers
	app.use('/product', ProductController);
	
	const server = app.listen(port, () => {
		console.log('Product API started on port:', port);
	});

	return server;
};

module.exports = { start };