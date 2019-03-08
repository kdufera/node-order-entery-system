require('../config/config');
let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);


describe('Products', () => {

	/*
	 * Test the /GET route
	 */
	//  describe('/POST product', () => {
	//     it('it should GET all the books', (done) => {
	//       chai.request(server)
	//           .get('/book')
	//           .end((err, res) => {
	//                 res.should.have.status(200);
	//                 res.body.should.be.a('array');
	//                 res.body.length.should.be.eql(0);
	//             done();
	//           });
	//     });
	// });


	/*
	 * Test the /POST route
	 */
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
				// res.body.should.be.a('object');
				// res.body.should.have.property('errors');
				// res.body.errors.should.have.property('pages');
				// res.body.errors.pages.should.have.property('kind').eql('required');
				done();
			});
		});
	});
});