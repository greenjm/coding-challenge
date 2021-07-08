const expect = require('chai').expect;
const request = require('supertest');
const service = require('../server');

describe('Server', () => {
	let server;

	beforeEach(() => {
		server = service.start(5000);
	});

	afterEach((done) => {
		server.close(done);
	});


	it('should return success status', (done) => {
		request(server)
			.get('/')
			.expect(200)
			.then(res => {
				expect(res.text).to.equal('Hello World');
				done();
			})
			.catch(err => done(err));
	});
});