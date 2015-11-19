var fs = require('fs');
var ejs = require('ejs');
var root =  __dirname + '/../';
var projectName = 'EvilCorpImpactTest';

var output =  function () {
  var component = {
    name: 'PokeDex',
    children: [{name: 'PokeList', children: [{name: 'PokeItem'}]}, {name: 'Pokemon', children: []}]
  };

  //EJS template will only require ReactDOM and render on the master component because its parent
  //attribute is set to 'true'
  component.parent = true;

  //Creates a file from React template and passes in an object with 'component'
  //as the key and the master component object as the value. EJS template is looking for 'component' object
  var file = ejs.render(fs.readFileSync('reactTemplate.ejs', 'utf-8'), {component: component});

  //Run createFiles function that creates a React file for each component and their subsequent subcomponents
  createFiles(component, 'OverReact');
}

function createFiles (obj, projectName) {
  if (!obj) return;
  fs.writeFileSync(`./${obj.name}.jsx`, file);
  if (!obj.children) return;
  obj.children.forEach(function (elem) {
    file = ejs.render(fs.readFileSync('reactTemplate.ejs', 'utf-8'), {component: elem});
    createFiles(elem, projectName)
  });
}

module.exports = output;
