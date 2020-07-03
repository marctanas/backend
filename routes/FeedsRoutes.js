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
            username: req.body.username,
            hashtags: req.body.hashtags,
            image: req.body.image,
            likes: req.body.likes
        };

        // console.log('From the user', formData); 

                
        // Find user in database
        FeedsModel.findOne(
            {username: formData.username},
            (err, document) => {
                
                //If username is not there, alert 
                if(!document){
                    res.send("Username is not on database")
                }

                //If the username already on database, examine the document( the formData - likes)
                else {

                    //get the object id of the user.
                    const newLikesArray = document._id;

                    //counter to search the id in likes
                    let counter = 0;
                    
                    //if id not yet liked to add
                    let notLiked = 1;
                                            
                    // console.log(newLikesArray);
                    // console.log(formData.likes);
                
                    for(counter = 0; counter < formData.likes.length; counter++){
                        if(formData.likes[counter] == newLikesArray){
                            formData.likes.splice(counter, 1) ;

                            // console.log('The id already liked and will be removed' , formData.likes );

                            notLiked = notLiked - 1;
                        } 
                        else{}
                    }

                    if(notLiked = 1){
                        //update the like with user ID
                        FeedsModel.updateOne(
                            {username: formData.username},
                            {$push:{likes: newLikesArray}},  //there is issue not adding to likes array

                            console.log(formData.username),
                            console.log(newLikesArray),
                            console.log('the id will be added to the liked array' , formData.likes)
                        );   
                    }
                    else{}
                }
                             
                // Save the data to database (feeds collection)
                const newFeedModel = new FeedsModel(formData);

                newFeedModel.save();
                res.send('Your LIKE POST has been received.');

            }
            
        )

    }
    
);


// Export the router
module.exports = router;
