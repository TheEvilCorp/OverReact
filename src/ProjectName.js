var React = require('react');
var Input = require('react-bootstrap').Input

var ProjectName = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props !== nextProps ? true : false;
  },
  render: function () {
    return (
        <Input onKeyDown={this.props.handler} type='text' label='Project Name' id='projectName' pattern="[a-zA-Z0-9_ ]+" required/>
    )
  }
});

module.exports = ProjectName;
