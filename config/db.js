const mongoose = require('mongoose');
const dbconfig = require('./dbconfig');

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb://localhost/StoryBook',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports= connectDB;