// Importing express inside your server
const express = require('express');
// Import mongoose inside server
const mongoose = require('mongoose');
// Import body-parser
const bodyParser = require('body-parser');
// Import passport
const passport = require('passport');
// Import the strategies & way to extract the jsonwebtoken
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Import cors
const cors = require('cors');

// The same secret in routes/UsersRoutes will be needed
// to read the jsonwebtoken
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
                UsersModel.findOne({ _id: jwtPayload.id })
                .then(
                    // If the document was found
                    (document) => {
                        return done(null, document);
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
const EmailsRoutes = require('./routes/EmailsRoutes');

// Create the server object
const server = express();

// Configure express to use body-parser
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(passport.initialize());
server.use(cors());

// Invoke passportJwt and pass the passport npm package as argument
passportJwt(passport);

// Enter your database connection URL
const dbURL = "mongodb+srv://admin01:pass123@cluster0-on0ly.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(
    dbURL,
    {
        'useNewUrlParser': true,
        'useUnifiedTopology': true
    }
).then(
    ()=>{
        console.log('You are connected MongoDB');
    }
).catch(
    (e)=>{
        console.log('catch', e);
    }
);

server.use(
    '/products',
    //passport.authenticate('jwt', {session:false}), // Use passport-jwt to authenticate
    ProductsRoutes
);

server.use(
    '/feeds',
    passport.authenticate('jwt', {session:false}), // Use passport-jwt to authenticate
    FeedsRoutes
);

server.use(
    '/users', 
    UsersRoutes
);

server.use(
    '/emails', 
    EmailsRoutes
);

// Create a route for the landing page
server.get(
    '/',
    (req, res) => {
        res.send(
            "<h1>Welcome to MyCars.com</h1>" +
            "<a href='/about'>About</a>"
            );
    }
);

// Route for 404
server.get('*', (req, res)=> {
    res.send('404! Page not found :(')
});


// Connect to port (range 3000 - 9999)
// http://127.0.0.1:8080 (aka http://localhost:8080)
server.listen( 
    8080, ()=>{
        console.log('You are connected http://127.0.0.1:8080!');
    }
);