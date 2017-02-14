'use strict';
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./app/routes/index.js');

var app  = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('../front-end/build/static'));


//connect the database
mongoose.connect(process.env.MONGO_URI|| 'mongodb://localhost:27017/foodnet' );
mongoose.Promise = global.Promise; 


//config path to use shortcut in views part
var rootPath = process.cwd();
app.use('/controllers', express.static(rootPath + '/app/controllers'));


//config the passport 
require('./app/config/passport')(passport);

//config the session for passport
app.use(session({
	secret: 'secretFoodnet',
	resave: false,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
	// res.send('OK');
});

routes(app, passport);
// server website

//listen for clients
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log('Server is listening on port : ' + port);
})