var request = require('request');
var App = require('./../server');

var slack = 'https://hooks.slack.com/services/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';

module.exports = function(req, res) {
  console.log(req.body)
  request.post({
    url: 'https://hooks.slack.com/services/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',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(req.body.payload),
    },
    function(err, response, body) {
      if(err) console.log(err);
      res.send(body);
    }
  );
};
