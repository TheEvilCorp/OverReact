var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var box = require('./box.js');
var box2 = require('./box2.js');

var container = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>container</div>
          <box />
          <box2 />
      </div>
    )
  }
});

module.exports = container;

ReactDOM.render(container, document.getElementById('#container'));
