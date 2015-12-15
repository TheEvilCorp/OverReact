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

var App = React.createClass({
  getInitialState: function() {
    return {
      hash: null,
      downloadModal: false,
      formModal: false
    }
  },
  componentDidMount: function() {
    mixpanel.track('Page Load');
  },
  submit: function (hash) {
    this.setState({
      downloadModal: true,
      hash: hash
    });
  },
  feedback(e) {
    e.preventDefault();
    this.setState({
      formModal: true,
    })
  },
  hideModal: function() {
    this.setState({
      downloadModal: false,
      formModal: false
    });
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
          <Footer formModal={this.feedback}/>
          <DownloadModal show={this.state.downloadModal} onHide={this.hideModal} hash={this.state.hash}/>
          <FormModal show={this.state.formModal} onHide={this.hideModal}/>
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main'));
