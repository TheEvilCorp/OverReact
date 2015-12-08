var exec = require('child_process').exec;
var fs = require('fs');


function zipFunction(req, res, next){
  console.log('zipFunction: Reticulating Splines...');
  
  exec(`mv ${req.body.folderName} ${req.body.projectName}; zip -r zips/${req.body.uniqueID}.zip ./${req.body.projectName}; rm -rf ${req.body.projectName}`, function(err, stdout, stderr) {
    next();
  });
}

module.exports = zipFunction;
