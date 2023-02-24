const express = require('express');
const multer = require('multer');
const mongodb = require('mongodb');
const fs = require('fs');
const app = express();
const port = 5000;;
const db=require('./config/mongoose');
var path = require('path');
//make the upload path available to the browser 
app.use('/uploads',express.static(__dirname + '/uploads'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/',require('./routes'));//it will move to routes/index.js for furthur 
app.use(express.urlencoded({extended:false}));
app.listen(port,function(err){
    if(err)
    {
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});