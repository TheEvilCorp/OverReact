var React = require('react');
var Gui = require('./Gui');
var Options = require('./Options');

var Application = React.createClass({

  render: function () {
    return (
      <div className='appContainer' id='application-section'>
          <Gui className='appChild'/>
          <Options className='appChild' submit={this.props.submit}/>
      </div>
    )
  }
});

module.exports = Application;
