var React = require('react');
var $ = require('jquery');

var box1 = require('./box1.js');

var box = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>box</div>
          <box1 />
      </div>
    )
  }
});

module.exports = box;


