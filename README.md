

# PRODUCT_ORDER_ENTRY_SYSTEM

This application incorporates RESTful API's that can receive an order with a customer number and the product IDs and quantities of the items ordered. The application initially calls an established inventory API to get a list of product name and price. An order can be placed and retrieved via the API's specified below.


# Instruction 
 
* MongoDB is required for this project 
    * run 'nongod' 

* Clone the repo 
    * run 'npm install'

* run 'node .' or 'nodmon .'


# Main API's

Get order summery:
* http://localhost:3000/order/v1/orderSummery/

    
Get Single Product:
*  http://localhost:3000/product/v1/petProduct/8ed0e6f7

    {
        "name": "",
        "price": ""
    }


POST a single Product:
* http://localhost:3000/product/v1/petProduct

    {
        "id": "",
        "name": "",
        "price": 0
    }

POST a Single Order:
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

