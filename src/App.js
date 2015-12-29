require('babel-register');
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
var FormModal = require('./FormModal');
// var html2canvas = require('../html2canvas-0.4.1/build/html2canvas.js');

var App = React.createClass({
  getInitialState: function() {
    return {
      hash: null,
      downloadModal: false,
      formModal: false,
      screenshot: null
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
      downloadModal: true,
      hash: hash
    });
  },
  feedback: function(e) {
    e.preventDefault();
    var that = this;
    console.log('clicked feedback');
    html2canvas(document.body, {
      onrendered: function(canvas) {
        var dataURL = canvas.toDataURL("image/png");
        console.log(dataURL);
        that.setState({
          screenshot: dataURL.replace(/^data:image\/(png|jpg);base64,/, ""),
          formModal: true
        });
      }
    });
  },
  hideModal: function() {
    this.setState({
      downloadModal: false,
      formModal: false
    });
  },
  render: function () {
    var navStyle = {textAlign: 'center'};

    return (
      <div>
          <Navbar style={navStyle} fixedTop={true} id='nav-section'><span id='nav-title'>OverReact<sup>Beta Version</sup></span></Navbar>
          <Home />
          <Application id={this.state.id} hash={this.state.hash} submit={this.submit}/>
          <WhatNext />
          <Footer formModal={this.feedback}/>
          <DownloadModal show={this.state.downloadModal} onHide={this.hideModal} hash={this.state.hash}/>
          <FormModal show={this.state.formModal} onHide={this.hideModal} screenshot={this.state.screenshot}/>
      </div>
    )
  }
});

export default React.render(<Route path="/" component={App}></Route>, document.getElementById('main'))
