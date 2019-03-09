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
 * Save Single Prdoct and remove duplicate 
 * @param {*} product 
 */
ProductSchema.methods.saveProduct = function(product) {
  return Product.findOne({id:product.id}).then((productData) => { 
    if(productData) { //exists , update with the latest product
      return Product.deleteOne({id:product.id}).then((res) => { 
        if(res) {
          return  product.save().then((acg) => {
            if(!acg) {
              return Promise.reject("Uable to save product");
            } else {
              return Promise.resolve("product saved");
            }
          });
        } else {
          return Promise.reject("Unable remove product");
        }
      });
    }
    else  { // save new product
      return  product.save().then((acg) => {
        if(!acg) {
          return Promise.reject("Uable to save product");
        } else {
          return Promise.resolve("product saved");
        }
      });
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
  });
}


/**
 * Filter product Object
 */

ProductSchema.methods.toJSON = function () {
  var product = this;
  var productObject = product.toObject();
  return _.pick(productObject,['id','name','price']);
};


const Product = mongoose.model('Product', ProductSchema);
module.exports = {Product};
