var exec = require('child_process').exec;

function zipFunction(req, res, next){
  console.log('zipping');
  exec(`zip -r archive_name.zip ${req.body.projectName}`, function(err, stdout, stderr) {
    next();
  });
}

module.exports = zipFunction;
