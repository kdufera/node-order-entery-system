require('../config/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

/*
 * Products API test
*/
describe('Products', () => {
	describe('POST Product', () => {
		it('it should POST a single product', (done) => {
			let token = {
					id: '8ed0e6f7',
					name: 'leash',
					price: '9.99'
			}
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
        });
        
        it('it should POST a single product', (done) => {
			let token = {
					id: '34343ded',
					name: 'leash-dog',
					price: 89
			}
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});

		it('it should not POST product', (done) => {
			let token = {
					id: '8ed0e6f7',
					name: 'leash'
			}
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.post('/')
			.send(token)
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(500);
				done();
			});
		});
    });
    
    describe('GET Product', () => {
        it('it should GET a single product', (done) => {
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.get('/34343ded')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
        });

        it('it should not GET a single product', (done) => {
			chai.request(process.env.LOCALHOST_PRODUCT_API)
			.get('/34343de')
			.end((err, res) => {
				res.should.have.status(500);
				done();
			});
        });
    });

    describe('DELETE Product', () => {
        it('it should DELETE ALL product', (done) => {
			chai.request(process.env.CLEARDB_API)
			.post('/')
			.send("")
			.set('Content-Type', 'application/json')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
		});
    });
});