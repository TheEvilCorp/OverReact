require('babel-register');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var exec = require('child_process').exec;
var fileController = require('./utils/fileController');
var mkDir = require('./utils/mkDir');
var ejs = require('ejs');
var zipFunction = require('./utils/zipFunction');
var addStandardFiles = require('./utils/addStandardFiles');
var capitalize = require('./utils/capitalize');
var compression = require('compression');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var RouterContext = require('react-router').RouterContext;
var Match = require('react-router').match;
var Routes = require('./../src/Routes');
// var sendToSlack = require('./utils/sendToSlack.js');
// var sessionController = require('./utils/sessionController');
//configure express
var app = express();

//Gzip express equivalent
app.use(compression());
//Parse req and attach json to req.body
app.use(bodyParser.json());
//Requests default to this path
// app.use(express.static(path.join(__dirname, './../')));
app.set('views', __dirname + './../');
app.set('view engine', 'ejs');

//have the index html send on root route
app.get('/', function(req,res) {
  match({Routes, location: req.url}, function(error, redirectLocation, renderProps ){
   if (error) {
     res.status(500).send(error.message)
   } else if (redirectLocation) {
     res.redirect(302, redirectLocation.pathname + redirectLocation.search)
   } else if (renderProps) {
     res.status(200).render('index', {html: ReactDOMServer.renderToString(React.createElement(RouterContext, renderProps))})
   } else {
     res.status(404).send('Not found')
   }
 })
});


// app.get('/serverSideRender', function(req, res) {
//   var appHtml = ReactDOM.renderToString(OverReact);
//   var html = injectIntoHtml({main: appHtml});
//   res.render(html);
// })
// Not using this right now
// app.get('/newtemplate', sessionController.createSession);

//post route for when the user is done setting up their component layout, kicks off middleware chain to create directory, write files to created directory, then zip file.
app.post('/submit', capitalize, mkDir, addStandardFiles, fileController, zipFunction, function(req,res) {
  res.send(req.body.folderName);
});

//on submit route response being sent successfully, the client will set location to /download to initiate the download of the zip
app.get('/download/*', function(req, res) {
  res.download(__dirname + `/../zips/${req.url.slice(req.url.indexOf(':') + 1)}.zip`);
  // console.log(req.url);
  // exec(`rm -rf ${req.url.slice(req.url.indexOf(':') + 1)}; rm -rf ${req.url.slice(req.url.indexOf(':') + 1)}.zip`);
});

// app.post('/feedback', sendToSlack.sendFeedback);

app.listen(process.env.PORT || 8000);
