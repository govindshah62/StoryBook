const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  
const morgan = require('morgan');
const methodOverride = require('method-override');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const mongoconnect = require('connect-mongo')(session);

dotenv.config({path: './config/config.env'});
require('./config/passport')(passport);

connectDB();
const app =express();

//BodyParser
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

//morgan
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

const {formatDate,stripTags,truncate,editIcon,select}= require('./helper/hbs');
//handlebars middleware
app.engine('.hbs', exphbs({helpers:{
    formatDate, 
    stripTags, 
    truncate,
    editIcon,
    select
}, defaultLayout: 'main',extname: '.hbs',}));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    store:new mongoconnect({mongooseConnection:mongoose.connection})
})); 

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//global var
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    next();
});

//static folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));


const port= process.env.PORT || 5000;
app.listen(port,
    console.log(`Server running on port ${port}`));