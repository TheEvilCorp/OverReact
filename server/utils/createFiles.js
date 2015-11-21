var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');
var exec = require('child_process').exec;

function createFiles (obj, projectName, file, promises, finish) {
  if(!obj) return;
  fs.writeFileAsync(`./${projectName}/${obj.name}.js`, file)
  .then(function(written) {
    if(!obj.children) return;
      obj.children.forEach(function(elem) {
        var promise = new Promise (function(resolve){
          resolve(exportFile(elem,projectName));
        promises.push(promise);
        finish();
      });
    });
  });
}

function exportFile (elem,projectName) {
  file = ejs.render(fs.readFileSync('./utils/templates/reactTemplate.ejs', 'utf-8'), {component: elem});
  return createFiles(elem, projectName, file);
}

function zipShit (projectName) {
  console.log('zipping');
  exec(`zip -r -X archive_name.zip ${projectName}; echo lol`, function(err, stdout, stderr) {
    console.log(stdout);
  });
}

module.exports = createFiles;
