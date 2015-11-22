var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');


module.exports = function(req, res, next){
	var promises = [];
	var file = ejs.render(fs.readFileSync(__dirname + '/templates/indexTemplate.ejs', 'utf-8'), {projectName: req.body.projectName});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/index.html`, file));
	
	file = ejs.render(fs.readFileSync(__dirname + '/templates/packageJSONTemplate.ejs', 'utf-8'), {projectName: req.body.projectName});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/package.json`, file));
	
	file = ejs.render(fs.readFileSync(__dirname + '/templates/gulpTemplate.ejs', 'utf-8'), {error: '<%= error.message %>'});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/gulpfile.js`, file));
	
	file = ejs.render(fs.readFileSync(__dirname + '/templates/serverTemplate.ejs', 'utf-8'));
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/server/server.js`, file));
	Promise.all(promises).then(next());
}