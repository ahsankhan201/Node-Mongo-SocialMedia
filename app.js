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





//DB

mongoose.connect(process.env.MONGO_URI)
.then(()=>
    console.log('Database Connected')
);

const portToListen = 3030
app.listen(port , ()=>{
    console.log(`Node js Api is listening on port: ${portToListen}`)
})
