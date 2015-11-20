var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var exec = require('child_process').exec;
var fileController = require('./utils/fileController');
var mkDir = require('./utils/mkDir');
var zipFunction = require('./utils/zipFunction');

var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

app.post('/submit', mkDir, fileController, zipFunction, function(req,res) {
  res.send('ok');
});


app.get('/download', function(req, res) {
  res.download(__dirname + "/../archive_name.zip");
});


app.listen(3000);
