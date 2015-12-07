var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Home = require('./Home');
var Application = require('./Application');
var WhatNext = require('./Whatnext');
var Footer = require('./Footer');
var Navbar = require('react-bootstrap').Navbar;

//


var App = React.createClass({
  getInitialState: function() {
    return {
      id: null,
      hash: null
    }
  },
  componentDidMount: function() {
    console.log('component mounted!');
    var that = this;
    $.ajax({
      type: 'GET',
      url: '/newtemplate',
      success: function(data) {
        that.setState({id: data._id, hash: data.hash});
      }
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
          <Application id={this.state.id} hash={this.state.hash}/>
          <WhatNext />
          <Footer />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main'));
