var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');
var exec = require('child_process').exec;

function createFiles (obj, projectName, file) {
  if(!obj) return;
  fs.writeFileAsync(`./${projectName}/${obj.name}.js`, file)
  .then(function(written) {
    if(!obj.children) return;
    obj.children.forEach(function (elem) {
      file = ejs.render(fs.readFileSync('./utils/templates/reactTemplate.ejs', 'utf-8'), {component: elem});
      return createFiles(elem, projectName, file);
    });
  })
  .then(function(data){
      console.log('zipping');
      exec(`zip -r -X archive_name.zip ${projectName}; echo lol`, function(err, stdout, stderr) {
        console.log(stdout);
      });
  });
}

module.exports = createFiles;
