var fs = require('fs');

var mkDir = function(req, res, next) {
  //fs stat checks if a directory exists, and if not it will create it. Then it will run the next middleware
  fs.stat(`./${req.body.projectName}`, function(err, stats) {
    if(!stats) {
      fs.mkdirSync(`./${req.body.projectName}`)
    }
    next();
  });
}

module.exports = mkDir;
