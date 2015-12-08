var React = require('react');
var $ = require('jquery');

var Instructions = require('./Instructions');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;

var Home = React.createClass({
  setFocus: function() {
    $('html, body').animate({
        scrollTop: $('#application-section').offset().top
    }, 500);
    $('#overReact-container').find('input').focus();
    return false;
});

  },
  render: function () {
    return (
      <div id='home-section'>
        <h1>The React File Generator</h1>
        <p>Wireframe React components and download starter files with one click</p>
        <p><Button onClick={this.setFocus} bsStyle="primary" bsSize="large" id='getStarted-btn'>Get Started</Button></p>
        <Instructions />
      </div>
    )
  }
});

module.exports = Home;
