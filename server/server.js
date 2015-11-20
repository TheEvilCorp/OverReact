var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var fileController = require('./utils/fileController');
var exec = require('child_process').exec;

var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

app.post('/stuff', function(req,res) {
  console.log(req.body);
  fs.stat(`./${req.body.projectName}`, function(err, stats) {
    if(!stats) {
      fs.mkdirSync(`./${req.body.projectName}`)
    }
    fileController(req.body.parent, req.body.projectName);
    // exec(`zip -r -X archive_name.zip ${req.body.projectName}; echo lol`, function(err, stdout, stderr) {
    //   console.log(stdout);
    // });
    res.send('ok');
  });
});


app.get('/test', function(req, res) {
  res.download(__dirname + "/../archive_name.zip");
});


app.listen(3000);
