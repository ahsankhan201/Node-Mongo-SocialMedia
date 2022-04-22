const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: 'First name is required',
    },
    last_name: {
        type: String,
        required: 'Last name is required',
    },
    father_name:{
        type: String,
        required: 'Father name is required',
    },
    email:{
        type: String,
        required: 'Email is required',
    },
    password:{
        type: String,
        required: 'password is required',
    }
})

module.exports = mongoose.model("post", postSchema)