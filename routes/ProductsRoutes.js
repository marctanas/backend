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

        // Instantiate the ProductsModel
        const newProductsModel = ProductsModel(formData);
        newProductsModel.save();

        res.send('Product has been saved!');

    }
    
);

// Export the router
module.exports = router;