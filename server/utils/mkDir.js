var fs = require('fs');

var mkDir = function(req, res, next) {
  fs.stat(`./${req.body.projectName}`, function(err, stats) {
    if(!stats) {
      fs.mkdirSync(`./${req.body.projectName}`)
    }
    next();
  });
}

module.exports = mkDir;
