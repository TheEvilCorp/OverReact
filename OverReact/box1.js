var React = require('react');
var $ = require('jquery');

var box3 = require('./box3.js');

var box1 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>box1</div>
          <box3 />
      </div>
    )
  }
});

module.exports = box1;


