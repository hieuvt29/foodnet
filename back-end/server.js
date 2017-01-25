'use strict';
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

//connect the database
mongoose.connect(process.env.MONGO_URI|| 'mongodb://localhost:27017/foodnet' );
mongoose.Promise = global.Promise; 
var app  = express();

//config the passport 
app.use(passport.initialize());
app.use(passport.session());
require('./app/config/passport')(passport);
//config the session for passport
app.use(session({
	secret: 'secretFoodnet',
	resave: false,
	saveUninitialized: true
}));



var routes = require('./app/routes/index.js');

app.use(bodyParser.urlencoded({extended: false}));


//config path to use shortcut in views part
var rootPath = process.cwd();
app.use('/controllers', express.static(rootPath + '/app/controllers'));





routes(app, passport);

//listen for clients
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log('Server is listening on port : ' + port);
})