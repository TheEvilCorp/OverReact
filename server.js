var express = require('express');
var app = express();

app.get('/',function(req,res) {
  res.download(__dirname + '/Archive.zip');
});

app.listen(3000);
