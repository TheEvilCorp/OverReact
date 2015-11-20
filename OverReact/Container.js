var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var PokeList1 = require('./PokeList1.js');
var Pokemon4 = require('./Pokemon4.js');

var Container = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>Container</div>
          <PokeList1 />
          <Pokemon4 />
      </div>
    )
  }
});

module.exports = Container;

ReactDOM.render(Container, document.getElementById('#container'));
