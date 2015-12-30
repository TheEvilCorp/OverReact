var exec = require('child_process').exec;
var fs = require('fs');


function zipFunction(req, res, next){
  console.log('zipFunction: Reticulating Splines...');

  exec(`zip -r zips/${req.body.folderName}.zip ./${req.body.folderName};rm -rf ./${req.body.folderName}`, function(err, stdout, stderr) {
    next();
  });
}

module.exports = zipFunction;
//
