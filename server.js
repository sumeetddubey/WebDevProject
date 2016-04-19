var express = require('express');
var mongoose = require('mongoose');
//var mongo = require('mongodb');


var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var bodyParser    = require('body-parser');
var multer        = require('multer');

mongoose.connect('mongodb://127.0.0.1:27017/webdev');

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true}));


app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.get('/hello', function(req, res){
    res.send('hello world');
});


require("./public/server/app.js")(app, mongoose, passport);

app.listen(port, ipaddress);