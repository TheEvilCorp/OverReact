var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');

function createFiles(obj, projectName, file) {
  //writes a file to the directory created in mkDir, using the React template ejs.
  fs.writeFileSync(`./${projectName}/${obj.name}.js`, file);
  //escape out of the recursive call
  if(!obj.children) return;
  //else create files for all of the child components
  return obj.children.map(function (elem) {
    file = ejs.render(fs.readFileSync(__dirname + '/templates/reactTemplate.ejs', 'utf-8'), {component: elem});
    return createFiles(elem, projectName, file);
  });
}

module.exports = createFiles;
