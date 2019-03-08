const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {Product} = require('./Product');



/**
* API used to save product
*/
router.post('/petProduct', function(req, res) {
  const body = _.pick(req.body,['id','name','price']);
    let product = new Product({
      id:body.id,
      name:body.name,
      price:body.price,
    });

    product.saveProduct(product).then((respData) => {
      if(respData) {
        res.status(200).send("Saved");
      } 
    }).catch((err) => {
        res.status(500).send();
    });
});


/**
 * API to get a single product
 */
router.get('/petProduct/:id', function(req, res) {
  let product = new Product();
  product.findProduct(req.params.id).then((productData) => {
    if(productData) {
          res.status(200).send(productData);
      } 
      }).catch((err) => {
          res.status(500).send();
       });
  })




module.exports = router;
