var React = require('react');
var $ = require('jquery');

var child1 = require('./child1.js');

var aaa = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>aaa</div>
          <child1 />
      </div>
    )
  }
});

module.exports = aaa;


