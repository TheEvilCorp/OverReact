var React = require('react');
var $ = require('jquery');

var a = require('./a.js');

var box1 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>box1</div>
          <a />
      </div>
    )
  }
});

module.exports = box1;


