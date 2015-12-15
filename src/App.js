var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Home = require('./Home');
var Application = require('./Application');
var WhatNext = require('./Whatnext');
var Footer = require('./Footer');
var Navbar = require('react-bootstrap').Navbar;
var Modal = require('react-bootstrap').Modal;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var DownloadModal = require('./DownloadModal');
var postFunction = require('../js/widgetHelpers/postFunction');

//


var App = React.createClass({
  getInitialState: function() {
    return {
      hash: null,
      modal: false
    }
  },
  componentDidMount: function() {
    var userId = localStorage.getItem('userId');
    if (!userId){
      userId = 'anonymous' + Math.round(Math.random() * 1000000000)
      userId = userId.toString()
      localStorage.setItem('userId', userId)
    }
    mixpanel.identify(userId);
    mixpanel.people.set_once('$first_name', userId);
    mixpanel.track('Page Load');
  },
  submit: function (hash) {
    this.setState({
      modal: true,
      hash: hash
    });
  },
  hideModal: function() {
    this.setState({modal: false});
  },
  render: function () {
    var navStyle = {textAlign: 'center'};
    
    return (
      <div>
          <Navbar style={navStyle} fixedTop={true} id='nav-section'><span id='nav-title'>OverReact</span></Navbar>
          <Home />
          <Application id={this.state.id} hash={this.state.hash} submit={this.submit}/>
          <WhatNext />
          <Footer />
          <DownloadModal show={this.state.modal} onHide={this.hideModal} hash={this.state.hash}/>
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main'));
