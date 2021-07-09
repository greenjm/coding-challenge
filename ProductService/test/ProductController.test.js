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

    describe('GET /product', () => {
        it('should return all products', (done) => {
            const expectedProductOne = {
                name: 'product one',
                description: 'first description',
                price: '1.00',
            };
            const expectedProductTwo = {
                name: 'product two',
                description: 'second description',
                price: '2.00',
            };
            mongoose.model('Product').create([
                expectedProductOne,
                expectedProductTwo,
            ]);
            
            request(server)
                .get('/product')
                .expect(200)
                .then(res => {
                    expect(res.body.length).to.equal(2);
                    const productOne = res.body[0];
                    const productTwo = res.body[1];

                    expect(productOne.name).to.equal(expectedProductOne.name);
                    expect(productOne.description).to.equal(expectedProductOne.description);
                    expect(productOne.price).to.equal(100);

                    expect(productTwo.name).to.equal(expectedProductTwo.name);
                    expect(productTwo.description).to.equal(expectedProductTwo.description);
                    expect(productTwo.price).to.equal(200);

                    done();
                })
                .catch(err => done(err));
        });
    });

    describe('GET /product/find', () => {
        it('should return the correct product', (done) => {
            const productOne = {
                name: 'product one',
                description: 'first description',
                price: '1.00',
            };
            const productTwo = {
                name: 'product two',
                description: 'second description',
                price: '2.00',
            };
            mongoose.model('Product').create([
                productOne,
                productTwo,
            ]);
            
            request(server)
                .get('/product/find')
                .query({ name: 'product one' })
                .expect(200)
                .then(res => {
                    expect(res.body.length).to.equal(1);
                    const product = res.body[0];

                    expect(product.name).to.equal(productOne.name);
                    expect(product.description).to.equal(productOne.description);
                    expect(product.price).to.equal(100);

                    done();
                })
                .catch(err => done(err));
        });
    });

    describe('PATCH /product', () => {
        it('should update an existing product', (done) => {
            const product = {
                name: 'test name',
                description: 'some description',
                price: '1.00',
            };
            const updatedProduct = {
                name: 'test name',
                description: 'some new description',
                price: '2.00',
            };
            mongoose.model('Product').create([
                product,
            ]);

            request(server)
                .patch('/product')
                .send(updatedProduct)
                .expect(200)
                .then(res => {
                    expect(res.body).to.equal(1);

                    done();
                })
                .catch(err => done(err));
        });
    });
});