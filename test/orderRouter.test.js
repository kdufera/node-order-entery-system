require('../config/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
var expect = chai.expect;

/*
 * Products API test
*/

describe('ORDER ROUTE TEST', () => {

	describe('POST ORDER TEST', () => {

		it('it should POST an order with multiple products', (done) => {
			let token = {
                customerId: '123456',
                items: [
                  {
                    productId: '8ed0e6f7',
                    quantity: 8
				  },
				  {
                    productId: '8ed0e6f7',
                    quantity: 12
				  },
				  {
                    productId: '8ed0e6f7',
                    quantity: 9
				  }
                ]
			}
			chai.request(process.env.LOCALHOST_ORDER_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(200);
				done();
			});
		});
		
		it('it should POST a single order', (done) => {
			let token = {
                customerId: '1234',
                items: [
                  {
                    productId: '8ed0e6f7',
                    quantity: 8
				  }
                ]
			}
			chai.request(process.env.LOCALHOST_ORDER_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(200);
				done();
			});
		});

		it('it should not POST an order with out customer Id ', (done) => {
			let token = {
                customerId: '',
                items: [
                  {
                    productId: '8ed0e6f7',
                    quantity: 8
				  }
                ]
			}
			chai.request(process.env.LOCALHOST_ORDER_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(500);
				done();
			});
		});

		it('it should not POST an order with empty product Id', (done) => {
			let token = {
                customerId: '1234',
                items: [
                  {
                    productId: '',
                    quantity: 8
				  }
                ]
			}
			chai.request(process.env.LOCALHOST_ORDER_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(500);
				done();
			});
		});

		it('it should not POST an order with empty quantity', (done) => {
			let token = {
                customerId: '1234',
                items: [
                  {
                    productId: '8ed0e6f7',
                    quantity: ''
				  }
                ]
			}
			chai.request(process.env.LOCALHOST_ORDER_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(500);
				done();
			});
		});
	});
	
	describe('GET ORDER TEST', () => {

		it('it should GET a single order', (done) => {
			chai.request(process.env.LOCALHOST_ORDER_SUMMERY_API)
			.get('/123456')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(200);
				done();
			});
        });
        
        it('it should GET a single order', (done) => {
			chai.request(process.env.LOCALHOST_ORDER_SUMMERY_API)
			.get('/1234')
			.end((err, res) => {
                expect(err).to.be.null;
				res.should.have.status(200);
				done();
			});
		});

	});
});