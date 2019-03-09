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
describe('PRODUCT ROUTE TEST', () => {

	describe('POST Product', () => {
		it('it should POST a single product', (done) => {
		
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.post('/')
			.send({
				id: '8ed0e6f7',
				name: 'leash',
				price: '9.99'
		})
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				expect(err).to.be.null;
				res.should.have.status(200);
				done();
			});
        });

		it('it should not POST product with missing price', (done) => {
			let token = {
					id: '8ed0e6f7',
					name: 'leash',
					price:''
			}
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				expect(err).to.be.null;
				res.should.have.status(500);
				done();
			});
        });
        
        it('it should not POST product id', (done) => {
			let token = {
                    name: 'leash',
                    price: 34
			}
			chai.request(process.env.LOCALHOST_PRODUCT_API)
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
    
    describe('GET Product', () => {
        it('it should GET a single product', (done) => {
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.get('/8ed0e6f7')
			.set('Accept', 'application/json')
			.end((err, res) => {
				expect(err).to.be.null;
				res.should.have.status(200);
				done();
			});
        });

        it('it should not GET a single product', (done) => {
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.get('/34343fdfdfde')
			.end((err, res) => {
				expect(err).to.be.null;
				res.should.have.status(500);
				done();
			});
		});
	});
});