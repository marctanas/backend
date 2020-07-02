// Import mongoose
const mongoose = require('mongoose');


// creating the Schema for what kind of collection will be saved in the DB
// class contructor
const FeedsSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        username: {
            type: mongoose.Schema.Types.ObjectId,    //instead of String
            required: true
        },
        hashtags: {
            type: Array
        },
        image: {
            type: String
        },
        likes: {
            type: Array
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
);

//model out of the schema
const FeedsModel = mongoose.model('feeds', FeedsSchema);

//to export to MongoDB
module.exports = FeedsModel;