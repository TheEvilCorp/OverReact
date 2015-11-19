var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');

function createFiles (obj, projectName, file) {
  if(!obj) return;
  fs.writeFileAsync(`./${obj.name}.js`, file)
  .then(function(written) {
    if(!obj.children) return;
    obj.children.forEach(function (elem) {
      file = ejs.render(fs.readFileSync('./templates/reactTemplate.ejs', 'utf-8'), {component: elem});
      createFiles(elem, projectName, file);
    });
  });
}

module.exports = createFiles;
