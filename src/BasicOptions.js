var React = require('react');
var Input = require('react-bootstrap').Input

var BasicOptions = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props !== nextProps ? true : false;
  },
  render: function () {
    return (
      <div>
        <p id='basic-options'>Basic Options</p>
        <Input type="checkbox" label="React component files only" id='basic' onChange={this.props.handler} readOnly checked={this.props.data.basic} />
        <Input type="checkbox" label="ES6 Format" id='es6' onChange={this.props.handler} readOnly checked={this.props.data.es6} />
      </div>
    )
  }
});

module.exports = BasicOptions;
