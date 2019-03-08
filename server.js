require('./config/config');
const express = require('express');
const app = express();
const {mongoose} = require ('./db/mongoose');  // db config
const fetch = require('node-fetch'); // fetch data for initial product load

const productRoter = require('./product/productRouter');
const orderRoter = require('./order/orderRouter');


app.set('port', (process.env.PORT || 3000));
app.use(express.json());


/**
* Route configuration for different endpoints
*/
 app.use('/product/v1', productRoter);  
 app.use('/order/v1', orderRoter); 



 //fetch data from API ( Initial load)
 fetch(process.env.PRODUCTS_API).then((res) => {
     if(res.status == 200) {
         return res.json();
     } else {
         console.log("unable to fetch products");
     } 
 }).then((resProducts) => {
      resProducts.body.forEach(function(element) {
        fetch(process.env.FETCH_PRODUCTS_API, {
            method: 'post',
            body:    JSON.stringify(element),
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            if(res.status != 200) {
                console.log("unable to save products");
            } else {
                // console.log("saved products to DB");
            }
        });
     });
});
 



app.listen(app.get('port'),function(){
    console.log(`App is runing. Listening on ${app.get('port')}`);
});
