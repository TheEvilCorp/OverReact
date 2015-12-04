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

      <Grid id='instruction-section'>
        <Row>
        <Col xs={6} md={4} className='instructions'>
          <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
       
          </Thumbnail>
        </Col>
        <Col xs={6} md={4} className='instructions'>
          <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
          
          </Thumbnail>
        </Col>
        <Col xs={6} md={4} className='instructions'>
          <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
            <h3>Thumbnail label</h3>
            <p>Description</p>
         
          </Thumbnail>
        </Col>
        </Row>
      </Grid>
    )
  }
});

module.exports = Instructions;


