const mongoose = require('mongoose');
const _ = require('lodash');


/**
* Product mongoose schema
*/

var ProductSchema = new mongoose.Schema({

  id: {
    type: String,
    required : true,
  },
  name: {
    type: String,
    required : true,
  },
  price: {
    type: String,
    required : true,
  }

});

/**
 * Save a single Product
 */

ProductSchema.methods.saveProduct = function(product) {
  return  product.save().then((acg) => {
    if(!acg) {
      return Promise.reject("Uable to save product");
    } else {
      return Promise.resolve("product saved");
    }
  });
}

/**
 * Find a single productt
 */
ProductSchema.methods.findProduct = function(productId) {
  return Product.findOne({id:productId}).then((productData) => { 
    if(productData) {
      return Promise.resolve(productData);
    } else {
      return Promise.reject("Unable to find product");
    }
  })
}


/**
 * Clear Products table
 */
ProductSchema.methods.clearTable = function() {
  return Product.remove({}).then((res) => { 
    if(res) {
      return Promise.resolve(res);
    } else {
      return Promise.reject("Unable to find product");
    }
  })
}


/**
 * Filter product Object
 */

ProductSchema.methods.toJSON = function () {
  var product = this;
  var productObject = product.toObject();
  return _.pick(productObject,['name','price']);
};


const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product};
