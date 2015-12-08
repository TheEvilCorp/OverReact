var fs = require('fs');
var ejs = require('ejs');

function writeCss(obj, file) {
  //create a write stream
  var cssStream = fs.createWriteStream(`./${obj.folderName}/css/style.css`);
  //execute this when all writes are down
  cssStream.on('finish', function() {

    return;
  })
  createCssFiles(obj.main, file, cssStream);
  return cssStream.end();
}


function createCssFiles(obj, file, stream) {
  stream.write(file);
  //escape out of the recursive call
  if(!obj.children) return;
  //else create files for all of the child components
  return obj.children.map(function (elem) {
    file = ejs.render(fs.readFileSync(__dirname + '/templates/styleTemplate.ejs', 'utf-8'), {component: elem});
    return createCssFiles(elem, file, stream);
  });
}

module.exports = writeCss;
