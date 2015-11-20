var React = require('react');
var $ = require('jquery');

var PokeItem1 = require('./PokeItem1.js');
var Pokedex1 = require('./Pokedex1.js');
var Pokedex2 = require('./Pokedex2.js');

var PokeList1 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>PokeList1</div>
          <PokeItem1 />
          <Pokedex1 />
          <Pokedex2 />
      </div>
    )
  }
});

module.exports = PokeList1;


