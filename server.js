var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/webdev');

var app = express();
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8000;
var bodyParser    = require('body-parser');
var multer        = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world');
});

require("./public/server/app.js")(app, mongoose);

app.listen(port, ipaddress);