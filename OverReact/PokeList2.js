var React = require('react');
var $ = require('jquery');

var PokeItem2 = require('./PokeItem2.js');

var PokeList2 = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    return (
      <div>
        <div>PokeList2</div>
          <PokeItem2 />
      </div>
    )
  }
});

module.exports = PokeList2;


