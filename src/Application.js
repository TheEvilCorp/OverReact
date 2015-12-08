var React = require('react');
var $ = require('jquery');

var Gui = require('./Gui');
var Options = require('./Options');

var Application = React.createClass({

  render: function () {
    return (
      <div id='application-section'>
          <Gui />
          <Options submit={this.props.submit}/>
      </div>
    )
  }
});

module.exports = Application;
