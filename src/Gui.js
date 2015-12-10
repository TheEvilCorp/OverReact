var React = require('react');
var $ = require('jquery');
var widget = require('./../js/widget')


var Gui = React.createClass({
  componentDidMount: function() {
    widget();
  },
  render: function() {
    return (
      <section id='overReact-sectionNotContainer'>
      <p id='Apptext'>App</p>
      <div id='overReact-container'></div>
      </section>
    )
  }
});

module.exports = Gui;
