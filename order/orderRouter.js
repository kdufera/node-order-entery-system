const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Order} = require('./order');
const fetch = require('node-fetch'); // fetch data for initial product load
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;


/**
 * API used to post order
 */
router.post('/userOrder', function(req, res) {

	var customerId = req.body.customerId;
	req.body.items.forEach(function(element) {
		var body = _.pick(element,['productId','quantity']);
		fetch(`${process.env.FETCH_PRODUCTS_API}/${body.productId}`)
		.then((resDataOne) => { 
			if(resDataOne.status == 200) {
				return resDataOne.json() 
			} else {
				res.status(200).send(""); 
			}
		})
		.then((resDataTwo) => {
			console.log(resDataTwo)
			let totalCost =  parseFloat(resDataTwo.price) * parseFloat(body.quantity);
			let order = new Order({customerId:customerId, productId:body.productId, quantity:body.quantity, totalCost:totalCost});
			order.saveOrder(order).then((resData) => {
				if(resData) {
					res.status(200).send(`${customerId} order saved.`);
				} 
			})
		}).catch((err) => {
			res.status(200).send("");
		});
	});
});

/**
 * API used to get user order summery 
 */

router.get('/orderSummery/:id', function(req, res) {
	let order = new Order();
	var summery = []

			order.findOrder(req.params.id).then((orderData) => {
				let total = 0;
				if(orderData) {
					var productUrl= [];
					var  orderDetail = [];
					orderData.forEach(function(element) {
						total = total + parseFloat(element.totalCost);
						productUrl.push(`${process.env.FETCH_PRODUCTS_API}/${element.productId}`);
					});
					let requests = productUrl.map(url => fetch(url));
					Promise.all(requests)
					.then(responses => {  
						return responses;
					}).then(responses => Promise.all(responses.map( (r) => {
						return r.json()
					}))).then((userData) =>  {
						var i;
						for (i = 0; i < userData.length; i++) { 
							userData[i].quantity = orderData[i].quantity;
						}
						summery.push(userData);
						summery.push({total});
						res.status(200).send(summery);
					});
				} 
			}).catch((err) => {
				res.status(200).send("");
			});
})


module.exports = router;



