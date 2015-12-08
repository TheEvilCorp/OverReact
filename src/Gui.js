var React = require('react');
var $ = require('jquery');
var widget = require('./../js/widget')


var Gui = React.createClass({
  componentDidMount: function() {
    widget();
  },
  render: function() {
    return (
      <div id='overReact-container'>App</div>
    )
  }
});

module.exports = Gui;
