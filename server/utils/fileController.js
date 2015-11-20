var fs = require('fs');
var ejs = require('ejs');
var root =  __dirname + '/../';
var createFiles = require('./createFiles');
var zip = require('./zipFunction');


function fileController (component, projectName) {
  //EJS template will only require ReactDOM and render on the master component because its parent
  //attribute is set to 'true'
  component.parent = true;

  //Creates a file from React template and passes in an object with 'component'
  //as the key and the master component object as the value. EJS template is looking for 'component' object
  var file = ejs.render(fs.readFileSync(__dirname + '/templates/reactTemplate.ejs', 'utf-8'), {component: component});

  //Run createFiles function that creates a React file for each component and their subsequent subcomponents
  createFiles(component, projectName).then(zip(projectName));
}




module.exports = fileController;
