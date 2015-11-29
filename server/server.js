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
var addStandardFiles = require('./utils/addStandardFiles');
var capitalize = require('./utils/capitalize');

var projectName;
//configure express
var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

//have the index html send on root route
app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

//post route for when the user is done setting up their component layout, kicks off middleware chain to create directory, write files to created directory, then zip file.
app.post('/submit', capitalize, mkDir, addStandardFiles, fileController, zipFunction, function(req,res) {
  projectName = req.body.projectName;
  res.send('ok');
});

//on submit route response being sent successfully, the client will set location to /download to initiate the download of the zip
app.get('/download', function(req, res) {
  res.download(__dirname + "/../archive_name.zip");
  exec(`rm -rf ${projectName}; rm -rf archive_name.zip`);
  // fs.unlinkSync(path.join(__dirname, "/../archive_name.zip"));
});

app.listen(8000);
