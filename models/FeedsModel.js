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
        loggedId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        username: {
            type: String,
            required: true
        },
        hashtags: {
            type: Array
        },
        image: {
            type: String
        },
        likes: [String],
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