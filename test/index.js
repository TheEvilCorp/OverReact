var request = require('supertest');
var chai = require('chai')
var expect = require ('chai').expect;
var app = require('./../server/server');
var httpMocks = require('node-mocks-http');
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
        main: dataObj
      }
    });
    var response = httpMocks.createResponse();

    it('Unit test for capitalize middleware function', function(done) {

      var next = function(){
        console.log('next executed');
      }
      capitalize(request, response, next);
      
      expect(request.body.main.name).to.eq('App')
      expect(request.body.main.children[0].name).to.eq('CompA')
      done();
    });
    it('Unit test for mkDir middleware function', function(done) {


    });
  });



    // it('Testing capitalize.js middleware', function(done) {
    //   var req = {};
    //   req.body = {};
    //   req.body.main = {
    //     name: 'testA',
    //     children:[{name: 'testB', children: []}, {name: 'testD'}]
    //   }
    //   var res = {};
    //   var next = function(){
    //     console.log('next executed')
    //   }
    //   capitalize(req, res, next)

    //   console.log('REQ.BODY.MAIN: ', req.body.main);
    //   expect(req.body.main).to.eq({name: 'TestA', children: [ { name: 'TestB', children: [] }, { name: 'TestD', children:[] } ] })

    //   // return expect(capitalize(req, res, next)).to.eq

    //   // request(app)
    //   //   .get('/messages')
    //   //   .end(function(err, res) {
    //   //     expect(JSON.parse(res.text)).to.be.a('array');
    //   //     done();
    //   //   });
    // });
    //});
});