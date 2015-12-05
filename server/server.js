var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var exec = require('child_process').exec;
var fileController = require('./utils/fileController');
var mkDir = require('./utils/mkDir');
var zipFunction = require('./utils/zipFunction');
var addStandardFiles = require('./utils/addStandardFiles');
var capitalize = require('./utils/capitalize');

//configure express
var app = express();
// var server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

//have the index html send on root route
app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

//post route for when the user is done setting up their component layout, kicks off middleware chain to create directory, write files to created directory, then zip file.
app.post('/submit', capitalize, mkDir, addStandardFiles, fileController, zipFunction, function(req,res) {
  res.send('ok');
});

//on submit route response being sent successfully, the client will set location to /download to initiate the download of the zip
app.get('/download/*', function(req, res) {
  res.download(__dirname + `/../${req.url.slice(req.url.indexOf(':') + 1)}.zip`);
  // console.log(req.url);
  exec(`rm -rf ${req.url.slice(req.url.indexOf(':') + 1)}; rm -rf ${req.url.slice(req.url.indexOf(':') + 1)}.zip`);
});

app.listen(process.env.PORT || 8000);
