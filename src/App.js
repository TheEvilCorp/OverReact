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
var createHistory = require('history').createHistory;
var useBasename = require('history').useBasename;
var Route = require('react-router');

const history = useBasename(createHistory)({
  basename: '/'
});

var App = React.createClass({
  getInitialState: function() {
    return {
      hash: null,
      modal: false
    }
  },
  componentDidMount: function() {
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
    return (
      <div>
          <Navbar fixedTop={true} id='nav-section'>
            <Navbar.Brand className='text-center'>
              <a href="#" id='nav-title'>OverReact</a>
            </Navbar.Brand>
          </Navbar>
          <Home />
          <Application id={this.state.id} hash={this.state.hash} submit={this.submit}/>
          <WhatNext />
          <Footer />
          <DownloadModal show={this.state.modal} onHide={this.hideModal} hash={this.state.hash}/>
      </div>
    )
  }
});

export default React.render(<Route path="/" component={App}></Route>, document.getElementById('main'))
