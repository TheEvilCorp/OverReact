var React = require('react');
var $ = require('jquery');
var widget = require('./../js/widget')


var Gui = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function(){
    widget();
  },

  render: function () {
    return (
      <div>
        <div id='overReact-container'></div>
      </div>

    )
  }
});

module.exports = Gui;
