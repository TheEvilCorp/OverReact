var Promise = require('bluebird')
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');


module.exports = function(req, res, next){
	var promises = [];

	//create an index.html
	var file = ejs.render(fs.readFileSync(__dirname + '/templates/indexTemplate.ejs', 'utf-8'), {projectName: req.body.projectName});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/index.html`, file));

	//create package.json
	file = ejs.render(fs.readFileSync(__dirname + '/templates/packageJSONTemplate.ejs', 'utf-8'), {
		projectName: req.body.projectName,
		server: req.body.server
	});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/package.json`, file));

	//create gulp
	file = ejs.render(fs.readFileSync(__dirname + '/templates/gulpTemplate.ejs', 'utf-8'), {error: '<%= error.message %>'});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/gulpfile.js`, file));

	//create server file
	file = ejs.render(fs.readFileSync(__dirname +  `/templates/${req.body.server === 'hapi' ? 'hapi' : 'express'}ServerTemplate.ejs`, 'utf-8'));
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/server/server.js`, file));

	Promise.all(promises).then(next());
}
