'use strict';
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./app/routes/index.js');

var app  = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//connect the database
// process.env.MONGO_URI = "mongodb://hieuvt:123123@ds033107.mlab.com:33107/foodnet";
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

//error emitter
app.use(function(err, req, res, next) {
    console.error(new Date() + " - " + JSON.stringify(err, null, '\t'));
    
    if(err.type) {
        switch(err.type) {
            case 'Bad Request':
                return res.status(400).send({ error: err });
                break;
            case 'Request Failed':
                return res.status(502).send({ error: 'Request Failed' });
                break;
            case 'Not Found':
                return res.status(404).send({ error: 'Not Found' });
                break;
        }
    } else {
        next(err);
    }
})

app.use(function(err, req, res, next) {
    res.status(500).send({ error: 'Something failed!' });
})
//end;

routes(app, passport);

//listen for clients
var port = process.env.PORT || 8080;
app.listen(port, function(){
	console.log('Server is listening on port : ' + port);
})