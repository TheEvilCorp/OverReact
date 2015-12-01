var React = require('react');
var $ = require('jquery');


var Gui = require('./Gui');
var Options = require('./Options');

var Application = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div id='application'>
          <Gui />
          <Options />
      </div>
    )
  }
});

module.exports = Application;
