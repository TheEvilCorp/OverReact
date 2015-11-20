var React = require('react');
var $ = require('jquery');

var PokeItem3 = require('../PokeItem3.js');

var PokeList3 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>PokeList3</div>
          <PokeItem3 />
      </div>
    )
  }
});

module.exports = PokeList3;


