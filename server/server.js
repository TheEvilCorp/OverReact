var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var CreateFiles = require('./utils/CreateFiles');
var exec = require('child_process').exec;

var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './../')));

app.get('/', function(req,res) {
  res.sendFile('/index.html');
});

app.post('/stuff', function(req,res) {
  // console.log(req.body);
  fs.stat(`./${req.body.projectname}`, function(err, stats) {
    if(!stats) {
      fs.mkdirSync(`./${req.body.projectname}`)
    }
    CreateFiles(req.body.parent, req.body.projectname);
    exec('zip -r -X archive_name.zip evil_corp; echo lol', function(err, stdout, stderr) {
      console.log(stdout);
    });
    res.send('ok');
  });
});


app.get('/test', function(req, res) {
  res.download(__dirname + "/../archive_name.zip");
});


app.listen(3000);
