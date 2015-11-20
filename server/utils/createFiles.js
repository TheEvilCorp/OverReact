var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');

function createFiles(obj, projectName, file) {
  fs.writeFileSync(`./${projectName}/${obj.name}.js`, file);
  if(!obj.children) return;
  return obj.children.map(function (elem) {
    file = ejs.render(fs.readFileSync(__dirname + '/templates/reactTemplate.ejs', 'utf-8'), {component: elem});
    return createFiles(elem, projectName, file);
  });
}

module.exports = createFiles;
