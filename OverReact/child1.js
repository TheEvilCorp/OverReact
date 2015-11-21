var React = require('react');
var $ = require('jquery');


var child1 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>child1</div>
      </div>
    )
  }
});

module.exports = child1;


