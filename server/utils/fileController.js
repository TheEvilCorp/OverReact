var fs = require('fs');
var ejs = require('ejs');
var createFiles = require('./createFiles');

function fileController (req, res, next) {
  //EJS template will only require ReactDOM for the master component because its the parent component, and this is where the parent renders to the DOM

  var component = req.body.main;

  component.parent = true;
  // console.log(component)

  //Creates a file from React template and passes in an object with 'component' as the key and the master component object as the value. EJS template is looking for 'component' object
  var template = req.body.template === 'es6' ? 'es6Template.ejs' : 'reactTemplate.ejs' ;
  var file = ejs.render(fs.readFileSync(__dirname + `/templates/${template}`, 'utf-8'), {component: component});

  //Run createFiles function that creates a React file for each component and their subsequent child components
  createFiles(component, req.body, file, template);
  next();
}

module.exports = fileController;
