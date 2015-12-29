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
      <div id='gui-header'>
        <h3 id='Apptext'>App</h3>
        <p id='dup-warning'>React does not allow duplicate component names</p> 
      </div>
      <div id='overReact-container'></div>
      </section>
    )
  }
});

module.exports = Gui;
