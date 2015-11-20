var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var PokeList = require('../PokeList.js');
var Pokemon = require('../Pokemon.js');

var PokeDex = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>PokeDex</div>
          <PokeList />
          <Pokemon />
      </div>
    )
  }
});

module.exports = PokeDex;

ReactDOM.render(PokeDex, document.getElementById('#container'));
