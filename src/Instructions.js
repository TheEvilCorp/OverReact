var React = require('react');
var $ = require('jquery');

var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;


var Instructions = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <Grid >
          <Row className="show-grid instruction-grid">
            <Col xs={5} md={3} className='instructions'>INSTRUCTIONS</Col>
            <Col xs={5} md={3} mdOffset={1} className='instructions'>INSTRUCTIONS</Col>
            <Col xs={5} md={3} mdOffset={1} className='instructions'>INSTRUCTIONS</Col>
           </Row>
        </Grid>
        
      </div>
    )
  }
});

module.exports = Instructions;


