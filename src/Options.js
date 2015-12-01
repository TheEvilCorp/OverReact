var React = require('react');
var $ = require('jquery');


var Options = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div className='options-container'>
        Options
        <button id="saveButton">Save Template</button>
        <button id="loadButton">Load Template</button>
      </div>
    )
  }
});

module.exports = Options;
