//npm init --> To  tell the system that we using node
//npm i express --> To install express

const express = require('express');
const app = express();
 require("dotenv").config();
const port = 8000;
const cors = require("cors");
const  JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./models/User');

const authRoutes = require("./routes/Auth");
const songRoutes = require("./routes/Song");
const playlistRoutes = require('./routes/Playlist')

app.use(cors());
app.use(express.json());

//routes
app.use("/auth",authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);




//connect mongodb to node app
//mongoose.connect() takes two argumnets --> 1.which db to connect to (db url) . 2. Connection options
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://ananyabhagat2000:${process.env.MONGO_PASSWORD}@cluster0.rrkx6rp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0` ,
{
// useNewUrlParser: true,
// useUnifiedTopology : true
})
.then((x) =>{
    console.log("Connected to database!!")
})
.catch((err) =>{
 console.log("Error while Connecting to database")
})


//setup passport-jwt
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret"
//process.env.SECRET_KEY;
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findOne({_id: jwt_payload.identifier});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}));



//req contains all the request data
//res contains all the response data
app.get("/",(req,res) =>{
    res.send("Hey!");
    });
    
    
    
//now we want to tell express that we want to run our server on localhost:8000
app.listen(port,() =>{
        console.log("App is running on port " + port)
})
