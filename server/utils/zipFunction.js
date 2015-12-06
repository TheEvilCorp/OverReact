var exec = require('child_process').exec;
var fs = require('fs');

function zipFunction(req, res, next){
      console.log('zipFunction: Reticulating Splines...');
      exec(`zip -r ./zips/${req.body.hash}.zip ./zips/${req.body.hash}/${req.body.projectName}; rm -rf ./zips/${req.body.hash}`, function(err, stdout, stderr) {
        next();
      });
}

module.exports = zipFunction;
