// Import express into the file
const express = require('express');
// invoke the router()
const router = express.Router();
// import the ProductsModel
const ProductsModel = require('../models/ProductsModel');


// A POST route for saving data into the 'products' collection
router.post(
    '/',   // http://localhost:8080/products
    (req, res) => {

        // read the product data
        const productData = {
            brand: req.body.brand,
            model: req.body.model,
            price: req.body.price,
            qty: req.body.qty
        };

        console.log(
            'From the user', productData
        );

        // Save the data to database (products collection)
        const newProductModel = new ProductsModel(productData);
        newProductModel.save(
            (err, dbResult) => {

                // if something goes wrong, send error
                if(err){
                    res.send(err)
                }
                // Otherwise, send success message
                else{
                    res.send('Your POST Products has been received.');
                }
            }
        );
    }
    
);

// Export the router
module.exports = router;