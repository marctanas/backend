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

            // () => {
            //     console.log();
            //     const newLikesArray = formData.loggedId;

            //     //counter to search the id in likes
            //     let counter = 0;
                
            //     //if id not yet liked to add
            //     let notLiked = 1;
                                        
            //     console.log(newLikesArray);
            //     console.log(formData.likes);
            


            //     if(notLiked == 1){
            //         console.log(newLikesArray);
            //         //update the like with user ID
            //         FeedsModel.updateOne(
            //             {username: formData.username},
            //             {$push:{likes: newLikesArray}},  
            //             (err, result) => {
            //                 if(err){
            //                     console.log('error from pushing', err)
            //                 }else{
            //                     console.log('this is the result', result)
            //                 }
            //             }
            //             //there is issue not adding to likes array
            //             // () => {
            //             // formData.likes.push(newLikesArray),
                        
            //             // console.log('the id will be added to the liked array' , formData.likes)
            //             //}
            //         );   
            //     }
            //     else{}
                             
            //     // Save the data to database (feeds collection)
            //     const newFeedModel = new FeedsModel(formData);

            //     newFeedModel.save();
            //     res.send('Your LIKE POST has been received.');

            // }




// // A POST route for like data data into the 'feeds' collection without using passport.authenticate
// router.post(
//     '/like',
//     (req, res) => {
        
//         // Read the form data
//         const formData = {
//             text: req.body.text,
//             username: req.user._id,
//             hashtags: req.body.hashtags,
//             image: req.body.image,
//             likes: req.body.likes
//         };

//         console.log('From the user', formData); 
                
//         // Find user in database
//         FeedsModel.findOne(
//             {username: formData.username},
//             (err, document) => {
                
//                 //If username is not there, alert 
//                 if(!document){
//                     res.send("Username is not on database")
//                 }

//                 //If the username already on database, examine the document( the formData - likes)
//                 else {

//                     //get the object id of the user.
//                     const newLikesArray = document._id;

//                     //counter to search the id in likes
//                     let counter = 0;
                    
//                     //if id not yet liked to add
//                     let notLiked = 1;
                                            
//                     console.log(newLikesArray);
//                     console.log(formData.likes);
                
//                     for(counter = 0; counter < formData.likes.length; counter++){
//                         if(formData.likes[counter] == newLikesArray){
//                             formData.likes.splice(counter, 1) ;

//                             console.log('The id already liked and will be removed' , formData.likes );

//                             notLiked = notLiked - 1;
//                         } 
//                         else{}
//                     }

//                     if(notLiked = 1){
//                         //update the like with user ID
//                         FeedsModel.updateOne(
//                             {username: formData.username},
//                             {$push:{likes: newLikesArray}},  //there is issue not adding to likes array

//                             console.log(formData.username),
//                             console.log(newLikesArray),
//                             console.log('the id will be added to the liked array' , formData.likes)
//                         );   
//                     }
//                     else{}
//                 }
                             
//                 // Save the data to database (feeds collection)
//                 const newFeedModel = new FeedsModel(formData);

//                 newFeedModel.save();
//                 res.send('Your LIKE POST has been received.');

//             }
            
//         )

//     }
    
// );

// // A POST route for like data data into the 'feeds' collection without using passport.authenticate
// router.post(
//     '/like',
//     (req, res) => {
        
//         // Read the form data
//         const formData = {
//             text: req.body.text,
//             username: req.user._id,
//             hashtags: req.body.hashtags,
//             image: req.body.image,
//             likes: req.body.likes
//         };

//         console.log('From the user', formData); 
                
//         // Find user in database
//         FeedsModel.findOne(
//             {username: formData.username},
//             () => {
                
//                 // //If username is not there, alert 
//                 // if(!document){
//                 //     res.send("Username is not on database")
//                 // }

//                 // //If the username already on database, examine the document( the formData - likes)
//                 // else {

//                     //get the object id of the user.
//                     //const newLikesArray = document._id;
//                     const newLikesArray = formData.username;

//                     //counter to search the id in likes
//                     let counter = 0;
                    
//                     //if id not yet liked to add
//                     let notLiked = 1;
                                            
//                     console.log(newLikesArray);
//                     console.log(formData.likes);
                
//                     for(counter = 0; counter < formData.likes.length; counter++){
//                         if(formData.likes[counter] == newLikesArray){
//                             formData.likes.splice(counter, 1) ;

//                             console.log('The id already liked and will be removed. the likes array are' , formData.likes );

//                             notLiked = notLiked - 1;
//                         } 
//                         else{}
//                     }

//                     if(notLiked == 1){
//                         console.log(notLiked);
//                         console.log(formData.ObjectId);
//                         //update the like with user ID
//                         FeedsModel.updateOne(
//                             {_id: formData._id},
//                             {$push:{likes: newLikesArray}},  //there is issue not adding to likes array
                            
//                             console.log(newLikesArray),
//                             console.log('the id will be added to the liked array' , formData.likes)
//                         );   
//                     }
//                     else{}
//                 // }
                             
//                 // Save the data to database (feeds collection)
//                 const newFeedModel = new FeedsModel(formData);

//                 newFeedModel.save();
//                 res.send('Your LIKE POST has been received.');

//             }
            
//         )

//     }
    
// );
