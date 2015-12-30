require('babel-register');
var request = require('supertest');
var chai = require('chai')
var expect = require ('chai').expect;
var httpMocks = require('node-mocks-http');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var app = require('./../server/server');
var capitalize = require('./../server/utils/capitalize');
var mkDir = require('./../server/utils/mkDir');
var addStandardFiles = require('./../server/utils/addStandardFiles');
var fileController = require('./../server/utils/fileController');
var zipFunction = require('./../server/utils/zipFunction');


describe('Back-End Tests', function() {
  describe('Creating routes', function() {

    it('GET request to / return status code of 200 & Content-Type of html', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done)
    });

  });

  describe('Testing middleware for /submit route', function() {
    //Request and response data objects
    var directory = path.join(__dirname, './../')
    var grandchildObj = {name: 'grandchild', children: [], position: {top: 53, left: 0}, height: 100, width: 100 }
    var childObj = {name: 'child', children: [grandchildObj], position: {top: 53, left: 0}, height: 100, width: 100 }
    var dataObj = {
      name: 'app',
      children: [
        {name: 'compA', children: [childObj], position: {top: 53, left: 0}, height: 100, width: 100},
        {name: 'compB', children: [], position: {top: 53, left: 0}, height: 100, width: 100},
        {name: 'compC', children: [], position: {top: 53, left: 0}, height: 100, width: 100}
      ],
      position: {top: 53, left: 0},
      height: 544,
      width: 833
    }
    var req = httpMocks.createRequest({
      method: 'POST',
      url: '/submit',
      body: {
        projectName: 'MOCHA_TEST_PROJECT',
        main: dataObj,
        server: 'hapi',
        task: 'grunt',
        template: 'es5'
      }
    });
    var res = httpMocks.createResponse();
    var next = function(){
      console.log('next executed');
    }

    // after(function(){
    //   var directory = path.join(__dirname, './../')
    //   console.log('file path: ', `${directory}${request.body.folderName}`)
    //   fs.stat(`${directory}${request.body.folderName}`, function(err, stats) {

    //     console.log('AFTER: ', stats);
    //     console.log('dirname: ', __dirname);
    //     console.log('error: ', err);
    //   });
    // });

    it('Unit test for capitalize middleware function', function(done) {
      capitalize(req, res, next);
      expect(req.body.main.name).to.eq('App');
      expect(req.body.main.children[0].name).to.eq('CompA');
      done();
    });

    it('Unit test for mkDir middleware function', function(done) {
      mkDir(req, res, function(){

        fs.stat(`${directory}${req.body.folderName}`, function(err, stats) {
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/css`, function(err, stats) {
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/server`, function(err, stats) {
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/src`, function(err, stats) {
          expect(!!stats).to.eq(true);
          done();
        });
        expect(req.body.uniqueID).to.match(/\w{32}$/);
        expect(req.body.folderName).to.match(/MOCHA_TEST_PROJECT-\w{32}$/);
      });
    });

    it('Unit test for addStandardFiles middleware function', function(done){
      addStandardFiles(req, res, function(){
        fs.stat(`${directory}${req.body.folderName}/index.html`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/package.json`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/gruntfile.js`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/server/server.js`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/css/style.css`, function(err, stats){
          expect(!!stats).to.eq(true);
          done();
        });
      });
    });

    it('Unit test for fileController middleware function', function(done){
      fileController(req, res, function(){
        fs.stat(`${directory}${req.body.folderName}/src/CompA.js`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/src/CompB.js`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/src/CompC.js`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/src/Child.js`, function(err, stats){
          expect(!!stats).to.eq(true);
        });
        fs.stat(`${directory}${req.body.folderName}/src/Grandchild.js`, function(err, stats){
          expect(!!stats).to.eq(true);
          done();
        });
      });
    });

    it('Unit test for zipFunction middleware function', function(done) {
      zipFunction(req, res, function(){
        fs.stat(`${directory}${req.body.folderName}`, function(err, stats) {
          expect(!!stats).to.eq(false);
        });
        fs.stat(`${directory}zips/${req.body.folderName}.zip`, function(err, stats) {
          expect(!!stats).to.eq(true);
          done();
        });
      });
    });

    it('POST request to /submit returns status code of 200 and name of zip file', function(done) {
      request(app)
        .post('/submit')
        .send(req.body)
        .end(function(err, response) {
          expect(response.status).to.eq(200);
          expect(response.text).to.match(/MOCHA_TEST_PROJECT-\w{32}$/);
          done();
        });
    });
  });
});
