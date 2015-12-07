var React = require('react');
var $ = require('jquery');
var widget = require('./../js/widget')


var Gui = React.createClass({
  componentDidMount: () => widget(),
  clearAll: () => $('.box').remove(),
  render: () =>
      <div>
        <div>Your session code is: {this.props.hash}<br /></div>
        <button onClick={this.clearAll}>CLEAR ALL</button>
        <div id='overReact-container'></div>
      </div>
  //
  //
  // function () {
  //   return (
  //     <div>
  //       <div>Your session code is: {this.props.hash}<br /></div>
  //       <button onClick={this.clearAll}>CLEAR ALL</button>
  //       <div id='overReact-container'></div>
  //     </div>
  //
  //   )
  // }
});

module.exports = Gui;
