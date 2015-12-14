var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = require('assert');
var	http = require('http');
var request = require('superagent');
var express = require('express');
var app = express();
var server = require('../server/server');
​
describe('server routes', function () {
  it('should return 200 for /', function (done) {
    http.get('http://localhost:8000', function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('should return 400 for /fail', function (done) {
    http.get('http://localhost:8000/fail', function (res) {
      assert.equal(400, res.statusCode);
      done();
    });
  });
});