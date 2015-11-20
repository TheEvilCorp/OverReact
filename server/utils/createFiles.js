var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');
var zip = require('./zipFunction');

// var promises = [];
function createFiles(obj, projectName, file) {
  return new Promise(function (resolve, reject) {
    fs.writeFileAsync(`./${projectName}/${obj.name}.js`, file);
    if(!obj.children) return;
    obj.children.map(function (elem) {
      file = ejs.render(fs.readFileSync(__dirname + '/templates/reactTemplate.ejs', 'utf-8'), {component: elem});
      return resolve(createFiles(elem, projectName, file));
    });
  });
}

module.exports = createFiles;
