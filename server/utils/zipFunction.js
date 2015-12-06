var exec = require('child_process').exec;
var fs = require('fs');

function zipFunction(req, res, next){
      console.log('zipFunction: Reticulating Splines...');
      exec(`zip -r zips/${req.body.hash}.zip ./${req.body.projectName}; rm -rf ${req.body.projectName}`, function(err, stdout, stderr) {
        next();
      });
}

module.exports = zipFunction;
