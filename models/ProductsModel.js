// Import mongoose
const mongoose = require('mongoose');

// creating the Schema for what kind of collection will be saved in the DB
// class contructor
const ProductsSchema = new mongoose.Schema(
    {
        brand: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }
);

//model out of the schema
const ProductsModel = mongoose.model('products', ProductsSchema);

//to export to MongoDB
module.exports = ProductsModel;