const expect = require('chai').expect;
const mongoose = require('mongoose');
const dbHandler = require('./db-handler');
const request = require('supertest');
const service = require('../server');

describe('ProductController', () => {
	let server;

	beforeEach(async () => {
		server = service.start(5000);
        await dbHandler.connect();
	});

	afterEach(async () => {
        await dbHandler.closeDatabase();
		await server.close();
	});

    describe('POST /product', () => {
        it('should create a new product', (done) => {
            const product = {
                name: 'test name',
                description: 'some description',
                price: '1.00',
            };

            request(server)
                .post('/product')
                .send(product)
                .expect(200)
                .then(res => {
                    expect(res.body.name).to.equal(product.name);
                    expect(res.body.description).to.equal(product.description);
                    expect(res.body.price).to.equal(100);

                    done();
                })
                .catch(err => done(err));
        });
    });
});