var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var ejs = require('ejs');
var writeCss = require('./writeCss');


module.exports = function(req, res, next){
	if(req.body.server === 'none' && req.body.task === 'none') return next();

	console.log(`addStandardFiles: adding standard files`);

	var promises = [];

	//create an index.html
	var file = ejs.render(fs.readFileSync(__dirname + '/templates/indexTemplate.ejs', 'utf-8'), {projectName: req.body.projectName});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/index.html`, file));
	//create package.json
	file = ejs.render(fs.readFileSync(__dirname + '/templates/packageJSONTemplate.ejs', 'utf-8'), {
		projectName: req.body.projectName,
		server: req.body.server,
		task: req.body.task
	});
	promises.push(fs.writeFileAsync(`./${req.body.projectName}/package.json`, file));

	//create task runner file
	if(req.body.task !== 'none') {
		file = ejs.render(fs.readFileSync(__dirname + `/templates/${req.body.task === 'gulp' ? 'gulp' : 'grunt'}Template.ejs`, 'utf-8'), {
		error: '<%= error.message %>'
		});
		promises.push(fs.writeFileAsync(`./${req.body.projectName}/${req.body.task === 'gulp' ? 'gulp' : 'grunt'}file.js`, file));
	}

	//create server file
	if(req.body.server !== 'none') {
		file = ejs.render(fs.readFileSync(__dirname +  `/templates/${req.body.server === 'hapi' ? 'hapi' : 'express'}ServerTemplate.ejs`, 'utf-8'));
		promises.push(fs.writeFileAsync(`./${req.body.projectName}/server/server.js`, file));
	}

	//create css
	file = ejs.render(fs.readFileSync(__dirname + '/templates/styleTemplate.ejs', 'utf-8'), {component: req.body.main});
	writeCss(req.body, file);

	//execute next after all promises finsish
	Promise.all(promises).then(next());
}
