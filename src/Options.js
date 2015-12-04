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
        <div className='container'>   
          Options
 



          <button id='saveButton'>Save Template</button>
          <button id='loadButton'>Load Template</button>
        </div>
     
      </div>
    )
  }
});

module.exports = Options;
