const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')



dotenv.config()
const port = process.env.PORT || 3030;


var postRout = require("././controllers/post");
var userRoute = require("././routes/user")
var networkRoute = require("././routes/network")
const morgan = require('morgan');

/// MIDDLEWARE

app.use(morgan('dev'))


// app.get('/' , getPosts.getPosts)
app.use(bodyParser.json())
app.use(cors());

app.use('/api/user' , userRoute);
app.use('/api/network' , networkRoute);
app.use('/api/post' , postRout);
app.use('/' , postRout);



https: app.use(function (req, res, next) {
    var allowedOrigins = [
      "http://localhost:3000/",
    ];
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", true);
    return next();
  });





//DB

mongoose.connect(process.env.MONGO_URI)
.then(()=>
    console.log('Database Connected')
);

const portToListen = 3030
app.listen(port , ()=>{
    console.log(`Node js Api is listening on port: ${portToListen}`)
})
