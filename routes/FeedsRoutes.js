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

        // read the 'Body' within Post request
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
        newFeedModel.save(
            (err, dbResult) => {

                // if something goes wrong, send error
                if(err){
                    res.send(err)
                }
                // Otherwise, send success message
                else{
                    res.send('Your POST Feeds has been received.');
                }
            }
        );

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

// A POST route for like data into the 'feeds/like' collection
router.post(
    '/like',
    (req, res) => {

        // capture username and like data
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image,
            likes: req.body.likes
        };

        console.log(
            'From the user', formData
        );

        //In database, Find username
        FeedsModel.findOne(
            {username: formData.username},
            (err, document) => {

                //If username already liked, do not updated 
                if(document.username == formData.likes){
                    res.send("Username already liked")
                }

                //add username to like feed
                else {
                    const newLikesArray = new FeedsModel(formData.username)
                    FeedsModel.updateOne(
                        {username: formData.username},
                        {likes: newLikesArray}
                    );
                }
            }
        )


        // Save the data to database (feeds collection)
        const newFeedModel = new FeedsModel(formData);
        newFeedModel.save(
            (err, dbResult) => {

                // if something goes wrong, send error
                if(err){
                    res.send(err)
                }
                // Otherwise, send success message
                else{
                    res.send('Your POST Like Feeds has been received.');
                }
            }
        );

    }
    
);


// A GET route for fetching data from the 'feeds/like' collection
router.get(
    '/like',
    (req, res)=>{

        // Fetch all the documetns using .find()
        FeedsModel.find(
            { id: document.id}
        )

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


// Export the router
module.exports = router;