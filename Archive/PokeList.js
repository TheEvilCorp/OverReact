var React = require('react');
var $ = require('jquery');

var PokeItem = require('../PokeItem.js');

var PokeList = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>PokeList</div>
          <PokeItem />
      </div>
    )
  }
});

module.exports = PokeList;


