var React = require('react');
var $ = require('jquery');

var PokeList2 = require('./PokeList2.js');
var Pokemon1 = require('./Pokemon1.js');

var Pokedex1 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>Pokedex1</div>
          <PokeList2 />
          <Pokemon1 />
      </div>
    )
  }
});

module.exports = Pokedex1;


