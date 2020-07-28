

# Product order entry system

This application incorporates RESTful API's that can receive an order with a customer number and the product IDs and quantities of the items ordered. The application initially calls an established inventory API to get a list of product name and price. An order can be placed and retrieved via the API's specified below.


# Instruction 
 
* mongoDB is required for this project 
    * run 'mongod' 

* Clone the repo and install NPM libraries 
    * run 'npm install'

* Run the App
    *  'npm start'
    
* Run test 
    * 'npm test'

# Main API's

Get order summery:
* http://localhost:3000/order/v1/orderSummery/123456

    
Get a single product:
*  http://localhost:3000/product/v1/petProduct/8ed0e6f7

    {   "id": "c0258525"
        "name": " ",
        "price": ""
    }


POST a single product:
* http://localhost:3000/product/v1/petProduct

    {
        "id": "",
        "name": "",
        "price": 0
    }

POST an order:
* http://localhost:3000/order/v1/userOrder

    {
    "customerId": "string",
    "items": [
        {
        "productId": "string",
        "quantity": 0
        }
    ]
    }

