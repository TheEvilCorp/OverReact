var React = require('react');
var $ = require('jquery');
var Input = require('react-bootstrap').Input


var Options = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div id='options-section'>
        <h3>Options</h3>
        <div className='form-group'>   
          <Input type='text' label='Project Name'></Input>
          <hr></hr>
          <button id='saveButton'>Save Template</button>
          <button id='loadButton'>Load Template</button>
        </div>
     
      </div>
    )
  }
});

module.exports = Options;
