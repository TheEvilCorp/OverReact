var fs = require('fs');
var ejs = require('ejs');

function createFiles(obj, dataObj, file) {
  //writes a file to the directory created in mkDir, using the React template ejs.
  var path = dataObj.server === 'none' && dataObj.task === 'none' ? `${obj.name}.js` : `src/${obj.name}.js`
  fs.writeFileSync(`./${dataObj.projectName}/${path}`, file);
  //escape out of the recursive call
  if(!obj.children) return;
  //else create files for all of the child components
  return obj.children.map(function (elem) {
    file = ejs.render(fs.readFileSync(__dirname + '/templates/reactTemplate.ejs', 'utf-8'), {component: elem});
    return createFiles(elem, dataObj, file);
  });
}

module.exports = createFiles;
