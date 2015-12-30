var fs = require('fs');
var hat = require('hat');

var mkDir = function(req, res, next) {
  //fs stat checks if a directory exists, and if not it will create it. Then it will run the next middleware
  req.body.uniqueID = hat();
  req.body.folderName = `${req.body.projectName}-${req.body.uniqueID}`
  fs.stat(`./${req.body.folderName}`, function(err, stats) {
    if(!stats) {
      fs.mkdirSync(`./${req.body.folderName}/`);
      if(req.body.server !== 'none' || req.body.task !== 'none'){
        if(req.body.server !== 'none') {
          fs.mkdirSync(`./${req.body.folderName}/server`);
        }
        fs.mkdirSync(`./${req.body.folderName}/css`);
        fs.mkdirSync(`./${req.body.folderName}/components`);
      }
    }
    next();
  });
}

module.exports = mkDir;
