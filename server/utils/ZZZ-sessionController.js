// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var Session = require('./sessionModel');
// var bodyParser = require('body-parser');
// var hat = require('hat');
// var config = require('config');

// initialize connection to MongoDB
// mongoose.connect(config.get('mongo.MONGO_URI'));
// mongoose.connection.once('open', function() {
//   console.log('Welcome to Evil Corp...');
// });

// var sessionController = {};

// sessionController.saveTemplate: function(req,res,next) {
//   Session.findByIdAndUpdate(req.body.id, {dataObject: req.body.main}, function(err,result){
//     if (err) console.log(err);
//     next();
//   });
// }

// sessionController.createSession: function(req,res,next) {
//   console.log('Creating session...')
//   Session.create({
//     hash: hat(),
//     dataObject: null
//   }, function(err, result) {
//     if (err) console.log(err);
//     console.log(`New session created! Your unique hash is ${result.hash}`)
//     res.send(result);
//     next();
//   });
// }

// module.exports = sessionController;
// 
