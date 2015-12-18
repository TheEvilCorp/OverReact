var request = require('supertest');
var chai = require('chai')
var expect = require ('chai').expect;
var httpMocks = require('node-mocks-http');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var app = require('./../server/server');
var capitalize = require('./../server/utils/capitalize')
var mkDir = require('./../server/utils/mkDir')


describe('Back-End Tests', function() {
  describe('Creating routes', function() {

    it('GET request to / return status code of 200 & Content-Type of html', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .expect(200, done)
    });

    it('GET request to / return status code of 404 & Content-Type of json THIS SHOULD FAIL', function(done) {
      request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(404,done)
        // .expect(404, done)
        // .end(function(err, res){
        //   console.log('res: ', res)
          
        // });
    });
  });
  
  describe('Testing middleware for /submit route', function() {  
    //Request and Response data objects
    var dataObj = {
      name: 'app',
      children: [
        {name: 'compA', children:[{name: 'child', children: []}]},
        {name: 'compB', children: []},
        {name: 'compC', children: []}
      ]
    }
    var request  = httpMocks.createRequest({
      method: 'GET',
      url: '/submit',
      body: {
        projectName: 'MOCHA_TEST_PROJECT',
        main: dataObj,
        server: 'hapi',
        task: 'grunt',
        template: 'es5'
      }
    });
    var response = httpMocks.createResponse();
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
      capitalize(request, response, next);
      expect(request.body.main.name).to.eq('App');
      expect(request.body.main.children[0].name).to.eq('CompA');
      done();
    });
    it('Unit test for mkDir middleware function', function(done) {
      mkDir(request, response, next);
      var directory = path.join(__dirname, './../')
      var madeFolder
      fs.stat(`${directory}${request.body.folderName}`, function(err, stats) {
        console.log('AFTER: ', stats);
        console.log('error: ', err);

        if(err) madeFolder = false;
        else madeFolder = true;
        console.log('madefolder in fs stat: ', madefolder)
      });
      expect(request.body.uniqueID).to.match(/\w{32}$/);
      expect(request.body.folderName).to.match(/MOCHA_TEST_PROJECT-\w{32}$/);
      console.log('madefolder before test', madeFolder)
      expect(madeFolder).to.eq(true);
      done();
    });

  });
});





