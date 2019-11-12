const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    blog: {
        type: String
    },
    thread: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }

});