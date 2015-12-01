var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Home = require('./Home');
var Application = require('./Application');
var Whatnext = require('./Whatnext');
var Footer = require('./Footer');
var Navbar = require('react-bootstrap').Navbar;


var App = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>     
          <Navbar fixedTop={true}>
            <Navbar.Brand className='text-center'>
              <a href="#">OverReact</a>
            </Navbar.Brand>
          </Navbar>

          <Home />
          <Application />
          <Whatnext />
          <Footer />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main'));
