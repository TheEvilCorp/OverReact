var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Session = require('./sessionModel');
var bodyParser = require('body-parser');
var hat = require('hat');
var config = require('config');
var mongo = config.get('mongodb');

// initialize connection to MongoDB
mongoose.connect(`mongodb://${mongo.username}:${mongo.password}@ds063919.mongolab.com:63919/heroku_6947c9dp`);
mongoose.connection.once('open', function() {
  console.log('Welcome to Evil Corp...');
});

var sessionController = {};
sessionController.createSession = createSession;
sessionController.saveTemplate = saveTemplate;

function saveTemplate(req,res,next) {
  Session.findByIdAndUpdate(req.body.id, {dataObject: req.body.main}, function(err,result){
    if (err) console.log(err);
    next();
  });
}

function createSession(req,res,next) {
  console.log('Creating session...')
  Session.create({
    hash: hat(),
    dataObject: null
  }, function(err, result) {
    if (err) console.log(err);
    console.log(`New session created! Your unique hash is ${result.hash}`)
    res.send(result);
    next();
  });
}

module.exports = sessionController;
