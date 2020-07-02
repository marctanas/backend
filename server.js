// Importing express inside your server
const express = require ('express');

// Import mongoose insider server
const mongoose = require('mongoose');

//Import body-parser
const bodyParser = require('body-parser');

// Import passport
const passport = require('passport');
// Import the strategies & way to extract the jsonwebtoken
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// The same secret in routes/UsersRoutes will be needed to read the jsonwebtoken
const secret = "s3cr3t100";

// We need the UsersModel to find the user in the database
const UsersModel = require('./models/UsersModel');

// Options for passport-jwt
const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

// This function is what will read the contents (payload) of the jsonwebtoken
const passportJwt = (passport) => {
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done) => {

                // Extract and find the user by their id (contained jwt)
                UsersModel.findOne({ _id: jwtPayload.id})
                .then(
                    // If the document was found
                    (document) => {
                        return done(null, document)
                    }
                )
                .catch(
                    // If something went wrong with database search
                    (err) => {
                        return done(null, null);
                    }
                )
            }
        )
    )
};

// Import routes
const ProductsRoutes = require('./routes/ProductsRoutes');
const FeedsRoutes = require('./routes/FeedsRoutes');
const UsersRoutes = require('./routes/UsersRoutes');


//---------
// Import database models (no longer used as they are in already linked in the router. so delete)
// const FeedsModel = require('./models/FeedsModel.js');
// const ProductsModel = require('./models/ProductsModel.js');
//---------

// Create the server object
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(passport.initialize());

// Invoke passportJwt and pass the passport package as argument
passportJwt(passport);


//Enter database connection URL from mongoDB
const dbURL = "mongodb+srv://admin01:pass123@cluster0-on0ly.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }

).then(
    ()=>{
        console.log('You are connected to MongoDB');
    }
).catch(
    (e)=>{
        console.log('catch', e);
    }
);

// link our ProductsRoutes
server.use(
    '/products', // http://localhost:8080/products
    passport.authenticate('jwt', {session:false}),   //authenticate user in order to proceed to products - use passport-jwt
    ProductsRoutes
);

// link our FeedsRoutes
server.use(
    '/feeds', // http://localhost:8080/feeds
    passport.authenticate('jwt', {session:false}),   //authenticate user in order to proceed to feeds - use passport-jwt
    FeedsRoutes
);

// link our UsersRoutes
server.use(
    '/users', // http://localhost:8080/users
    UsersRoutes
);

// Create a route for the landing page
server.get(
    '/',
    (req, res)=>{
        res.send(
            "<h1> Welcome to somewebsite.com</h1>" +
            "<a href='/about'>About</a>" + " " +
            "<a href='/contact'>Contact</a>" + " " +
            "<a href='/products'>Products</a>"
        );
    }
);

//------------
//the below code was sample to show and will not be needed as it will be done via frontend
// Create a route for the about page
// server.get(
//     '/about',
//     (req, res)=>{
//         res.send("<h1> About us</h1>");
//     }
// );

// Create a route for the contact page
// server.get(
//     '/contact',
//     (req, res)=>{
//         res.send(
//             "<h1> Contact</h1>" +
//             "<li> name: marc tanas</li>" +
//             "<li> email: mstanas@hotmail.com</li>" +
//             "<li> telephone: 76896713</li>" +
//             "<li> address: Beirut, Lebanon</li>"
//             );

//     }
// );

// Create a route for the products page
// server.get(
//     '/products',
//     (req, res)=>{
//         res.send(
//             "<h1> Our Products</h1>" +
//             "<li> iphone x: 15AED</li>" +
//             "<li> iphone 11: 20AED</li>"
//             );
//     }
// );
//-----------

// Create a route for the 404 page
server.get(
    '*',
    (req, res)=>{
        res.send(
            "<h1> 404! Page not Found</h1>"
            );
    }
);

// Connect to port (range 3000 - 9999)
// http://127.0.0.1:8080 (aka http://localhost:8080)  this is on local machine
server.listen( 
    8080, ()=>{
        console.log('You are connected to Localhost http://127.0.0.1:8080');
    }
)