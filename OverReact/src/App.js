var React = require('react');
var ReactDOM = require('react-dom');
var Daniel = require('./Daniel');
var Brian = require('./Brian');
var Rico = require('./Rico');

var App = React.createClass({
  render: function () {
    return (
      <div id='App'>
        App
        
          <Daniel />
          <Brian />
          <Rico />
      </div>
    )
  }
});

module.exports = App;

ReactDOM.render(<App />, document.getElementById('main-container'));
