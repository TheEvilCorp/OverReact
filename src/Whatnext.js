var React = require('react');
var Well = require('react-bootstrap').Well;
//

var WhatNext = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div id='whatNext-section'>
        <h2>What Next?</h2>
        <Well bsSize='small'><p>1) Move the unzipped files to your project directory</p></Well>
        <Well bsSize='small'><p>2) Navigate to your project folder in the command line</p></Well>
        <Well bsSize='small'><p>3) Run &nbsp;&nbsp;<span className='terminal-text'>npm install</span></p></Well>
        <Well bsSize='small'>
          <p>4) Run &nbsp;&nbsp;<span className='terminal-text'>npm run start-dev</span></p>
          <pre className='windows-directions'>
            <p>For Windows users only:</p>
            <p>&nbsp;&nbsp; Run &nbsp;&nbsp;<span className='terminal-text'>npm run task</span></p>
            <p>&nbsp;&nbsp; Run &nbsp;&nbsp;<span className='terminal-text'>npm start</span></p>
          </pre>
        </Well>
        <Well bsSize='small'><p>5) Open your browser and go to http://localhost:3000</p></Well>
      </div>
    )
  }
});

module.exports = WhatNext;
