// import libraries
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/router");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// initialise express
const app = express();

// initialise global variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors());

// serve static files

app.use(express.static(__dirname+'/public'));

// ports and mongo
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const start = (port,mongo_uri) => {
    try {
        mongoose.connect(mongo_uri).then(()=> {
            app.listen(port, () => {
                console.log("server running on port: "+`http://localhost:${port}`);
            });
        }).catch((e)=>new Error(e));
    } catch (error) {
        throw new Error(error);
    }
}

start(PORT,MONGO_URI);


/// serve basic routes

app.get('/',(req,res)=> {
    try {
        res.sendFile(__dirname+'/public/index.html');
    } catch (error) {
        throw new Error(error);
    }
});
const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    // check json jwt exists & is verified
    if(token) {
        jwt.verify(token,'jwt secret key123', (err, decodedToken) => {
            if(err) {
                res.redirect('/');
                console.log(err.message);
            }else {
                console.log(decodedToken);
                next();
            }
        });
    }else {
        res.redirect('/');
    }  
}
app.get('/landingpage',requireAuth,(req,res)=> {
    try {
        console.log("sending landingpage");
        res.sendFile(__dirname+'/public/secretPage.html');
    } catch (error) {
        throw new Error(error);
    }
});

app.get('/logout',(req,res)=> {
    res.cookie('jwt',' ', {maxAge: 1});
    res.redirect('/');
});
// import service routers

app.use('/api',router);