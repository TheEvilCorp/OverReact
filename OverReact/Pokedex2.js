var React = require('react');
var $ = require('jquery');

var PokeList3 = require('./PokeList3.js');
var Pokemon3 = require('./Pokemon3.js');

var Pokedex2 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>Pokedex2</div>
          <PokeList3 />
          <Pokemon3 />
      </div>
    )
  }
});

module.exports = Pokedex2;


