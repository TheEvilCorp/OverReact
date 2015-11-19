var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

module.exports = function createFiles (obj, projectName) {
  if(!obj) return;
  fs.writeFileAsync(`./${projectName}/${obj.name}.js`, fs.readFileSync(__dirname + '/../../src/app.js'), 'utf-8')
  .then(function(written) {
    if(!obj.children) return;
    obj.children.forEach(elem => createFiles(elem, projectName))
  });
};
