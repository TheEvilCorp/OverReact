var fs = require('fs');

var mkDir = function(req, res, next) {
  //fs stat checks if a directory exists, and if not it will create it. Then it will run the next middleware

  fs.stat(`./zips/${req.body.hash}/${req.body.projectName}`, function(err, stats) {
    console.log('mkDir: creating folders');
    if(!stats) {
      fs.mkdirSync(`./zips/${req.body.hash}/`);
      fs.mkdirSync(`./zips/${req.body.hash}/${req.body.projectName}`);
      if(req.body.server !== 'none' || req.body.task !== 'none'){
        if(req.body.server !== 'none') {
          fs.mkdirSync(`./zips/${req.body.hash}/${req.body.projectName}/server`);
        }
        fs.mkdirSync(`./zips/${req.body.hash}/${req.body.projectName}/css`);
        fs.mkdirSync(`./zips/${req.body.hash}/${req.body.projectName}/src`);
      }
    }
    next();
  });
}

module.exports = mkDir;
