const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('User',userschema);