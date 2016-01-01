import 'babel-register';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import Promise from 'bluebird';
var fs = Promise.promisifyAll(require('fs'));
import { exec } from 'child_process';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import fileController from './../server/utils/fileController';
import mkDir from './../server/utils/mkDir';
import zipFunction from './../server/utils/zipFunction';
import addStandardFiles from './../server/utils/addStandardFiles';
import capitalize from './../server/utils/capitalize';
import sendToSlack from './../server/utils/sendToSlack';
import routes from './../src/Routes';
//configure express
const app = express();

//set ejs view for SSR
app.set('view engine', 'ejs');
//Gzip express equivalent
app.use(compression());
//Parse req and attach json to req.body
app.use(bodyParser.json({limit: '50mb'}));
//Requests default to this path
app.use(express.static(path.join(__dirname, './../')));
app.set('views', __dirname + '/../views');
app.set('view engine', 'ejs');

//have the index html send on root route
app.get('/', function(req,res) {
  match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      // console.log(renderProps);
      if (error) {
        res.sendStatus(500);
      } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
          var content = renderToString(<RoutingContext {...renderProps} />);
          res.render('ssrIndex', {content: content});
          } else {
              res.status(404).send('Not found')
            }
      });
});

// Not using this right now
// app.get('/newtemplate', sessionController.createSession);

//post route for when the user is done setting up their component layout, kicks off middleware chain to create directory, write files to created directory, then zip file.
app.post('/submit', capitalize, mkDir, addStandardFiles, fileController, zipFunction, function(req,res) {
  res.send(req.body.folderName);
});

//on submit route response being sent successfully, the client will set location to /download to initiate the download of the zip
app.get('/download/*', function(req, res) {
  res.download(__dirname + `/../zips/${req.url.slice(req.url.indexOf(':') + 1)}.zip`);
});

app.post('/feedback', function(req,res){
  sendToSlack(req, res)
});

app.listen(process.env.PORT || 8000, function(){
  console.log(`listening on port ${process.env.PORT || 8000}`)
});

module.exports = app;
