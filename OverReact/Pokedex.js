var React = require('react');
var $ = require('jquery');

var PokeList = require('../PokeList.js');
var Pokemon = require('../Pokemon.js');

var Pokedex = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>Pokedex</div>
          <PokeList />
          <Pokemon />
      </div>
    )
  }
});

module.exports = Pokedex;


