// Import express into the file
const express = require('express');
// invoke the router()
const router = express.Router();
// import the ProductsModel
const ProductsModel = require('../models/ProductsModel');


// A POST route for creating product
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


// POST route to update product
router.post(
    '/update',
    (req, res) => {
        const formData = {
            qty: req.body.qty,
            _id: req.body._id
        };

        ProductsModel
        .findOneAndUpdate(
            {_id: formData._id},  // search criteria
            {qty: formData.qty},  // the keys & values to update
            {}, //options (if any)
            (err, document) => {

                if(err) {
                    console.log(err);
                } else {
                    res.json(
                        {
                            message: 'product updated',
                            document: document
                        }
                    )
                }

            }
        )

    }
)

// Export the router
module.exports = router;