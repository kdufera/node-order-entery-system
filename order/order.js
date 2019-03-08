const mongoose = require('mongoose');
const _ = require('lodash');
const https = require('https');


/**
* Products mongoose schema
*/


var OrderSchema = new mongoose.Schema({

  customerId: {
    type: String,
    required : true,
  },
  productId: {
    type: String,
    required : true,
  },
  quantity: {
    type: Number,
    required : true,
  },
  totalCost: {
    type: Number,
    required : true,
  }

});

/**
 * schema method used to save  a single order
 */

OrderSchema.methods.saveOrder= function(product) {
  return  product.save().then((acg) => {
    if(!acg) {
      return Promise.reject("Uable to save order");
    } else {
      return Promise.resolve("saved product");
    }
  });
}


/**
 * Find a  Order
 */
OrderSchema.methods.findOrder = function(userId) {
  return Order.find({customerId:userId}).then((orderData) => { 
        if(orderData) {
          return Promise.resolve(orderData);
        } else {
          return Promise.reject("Unable to find Order");
        }
  })
}

/**
 * User to filter Object
 */

OrderSchema.methods.toJSON = function () {
  var order = this;
  var orderObject = order.toObject();
  return _.pick(orderObject,['productId','quantity','totalCost']);
};


const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };
