var React = require('react');
var $ = require('jquery');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Thumbnail = require('react-bootstrap').Thumbnail;
var Button = require('react-bootstrap').Button;

var Instructions = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      // <div>
      //   <Grid >
      //     <Row className="show-grid instruction-grid">
      //       <Col md={3} className='instructions'>INSTRUCTIONS</Col>
      //       <Col md={3} className='instructions'>INSTRUCTIONS</Col>
      //       <Col md={3} className='instructions'>INSTRUCTIONS</Col>
      //     </Row>
      //   </Grid>

      // </div>

      <div id='instruction-section'>
        <div className='instructions'>
          <div>
            <img src="/images/instruction1.png" alt="242x200"/>
            <h3>Create your first component</h3>
            <p>Input a component name and hit enter.</p>
          </div>
        </div>
        <div className='instructions'>
          <div>
            <img src="/images/instruction2.png" alt="242x200"/>
            <h3>Layout your components</h3>
            <p>Drag, drop, resize and nest components.</p>
            <p>Double-click on component name to edit.</p>
          </div>
        </div>
        <div className='instructions'>
          <div>
            <img src="/images/instruction4.png" alt="242x200"/>
            <h3>Select Options</h3>
            <p>Click "Download" to get the starter files</p>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Instructions;
