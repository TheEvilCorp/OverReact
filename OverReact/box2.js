var React = require('react');
var $ = require('jquery');

var aaa = require('./aaa.js');

var box2 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>box2</div>
          <aaa />
      </div>
    )
  }
});

module.exports = box2;


