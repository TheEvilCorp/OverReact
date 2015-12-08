var React = require('react');
var $ = require('jquery');
var widget = require('./../js/widget')


var Gui = React.createClass({
  componentDidMount: function() {
    widget();
  },
  clearAll: function() {
    $('.box').remove();
  },
  render: function() {
    return (
      <div id='overReact-container'></div>
    )
  }
});

module.exports = Gui;
