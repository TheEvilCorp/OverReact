var fs = require('fs');
var ejs = require('ejs');
var root =  __dirname + '/../';
var createFiles = require('./createFiles');

function fileController (component, projectName, promises, finish) {
  //EJS template will only require ReactDOM and render on the master component because its parent
  //attribute is set to 'true'
  component.parent = true;

  //Creates a file from React template and passes in an object with 'component'
  //as the key and the master component object as the value. EJS template is looking for 'component' object
  var file = ejs.render(fs.readFileSync('./utils/templates/reactTemplate.ejs', 'utf-8'), {component: component});

  //Run createFiles function that creates a React file for each component and their subsequent subcomponents
  createFiles(component, projectName, file, promises, finish);
};




module.exports = fileController;
