var fs = require('fs');
var ejs = require('ejs');

function createFiles(obj, dataObj, file, template) {
  //writes a file to the directory created in mkDir, using the React template ejs.
  var path = dataObj.server === 'none' && dataObj.task === 'none' ? `${obj.name}.js` : `components/${obj.name}.js`
  fs.writeFileSync(`./${dataObj.folderName}/${path}`, file);
  //escape out of the recursive call
  if(!obj.children) return;
  //else create files for all of the child components
  return obj.children.map(function (elem) {
    file = ejs.render(fs.readFileSync(__dirname + `/templates/${template}`, 'utf-8'), {component: elem});
    return createFiles(elem, dataObj, file, template);
  });
}

module.exports = createFiles;
