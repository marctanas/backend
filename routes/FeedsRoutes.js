// Import express into the file
const express = require('express');
// invoke the router()
const router = express.Router();
// import the FeedsModel
const FeedsModel = require('../models/FeedsModel');


// A POST route for saving data into the 'feeds' collection
router.post(
    '/',
    (req, res) => {

        // read the form data
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image
        };

        console.log(
            'From the user', formData
        );

        // Save the data to database (feeds collection)
        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save();

        res.send('Your POST has been received.');

    }
    
);

// A GET route for fetching data from the 'feeds' collection
router.get(
    '/',
    (req, res)=>{

        // Fetch all the documetns using .find()
        FeedsModel.find()

        //Once the results are ready, use .json() to send the results
        .then(
            (results) => {
                //res.json = res.send() + converts to JSON
                res.json(results)
            }
        )
        .catch(
            (e) => {
                console.log('error eccured', e)
            }
        )

    }
);


// A POST route for like data data into the 'feeds' collection without using passport.authenticate
router.post(
    '/like',
    (req, res) => {
        
        // Read the form data
        const formData = {
            text: req.body.text,
            loggedId: req.user.id,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image,
            likes: req.body.likes,
            feedId: req.body.feedId
        };

        //console.log('From the user', formData); 
                
        // Find user in database
        FeedsModel.findOne(
            {_id: formData.feedId}  
        )
        .then((feed) => {
            console.log(feed);
            if(feed.likes.includes(formData.loggedId)){

                FeedsModel.updateOne({_id: formData.feedId}, {$pull : {likes: formData.loggedId }} , (err, result) =>{
                    if(err){console.log('could not update the likes ')
                }else {
                    console.log('updated', result)
                }
                })
            }else {
                FeedsModel.updateOne({_id: formData.feedId}, {$push : {likes: formData.loggedId }} , (err, result) =>{
                    if(err){console.log('could not update the likes ')
                }else {
                    console.log('updated', result)
                }
                })
            }
            res.send('updated correctly')
        }
        
        )

    }
    
);


// Export the router
module.exports = router;
