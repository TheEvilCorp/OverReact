var React = require('react');
var $ = require('jquery');

var Instructions = require('./Instructions');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;

var Home = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div id='home-section'> 
        <h1>The React file generator</h1>
        <p>Wireframe your React components and download</p>
        <p>your starter files with one click</p>
        <p><Button bsStyle="primary" bsSize="large" id='getStarted-btn'>Get Started</Button></p>
        <Instructions />
      </div>
    )
  }
});

module.exports = Home;


