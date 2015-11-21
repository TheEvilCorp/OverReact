var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var box1 = require('./box1.js');
var box2 = require('./box2.js');

var container = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>container</div>
          <box1 />
          <box2 />
      </div>
    )
  }
});

module.exports = container;

ReactDOM.render(container, document.getElementById('#container'));
