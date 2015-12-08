var React = require('react');
var Input = require('react-bootstrap').Input


var ServerComponent = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props !== nextProps ? true : false;
  },
  render: function () {
    return (
      <div className='radio-sections'>
        <p>Choose a task runner</p>
        <label className="radio-inline" className='radio-btns'>
          <Input name="taskRunners" id="gulp" value="gulp" type="radio" onChange={this.props.handler} label='Gulp' checked={this.props.data.gulp} />
        </label>
        <label className="radio-inline" className='radio-btns'>
          <Input name="taskRunners" id="grunt" value="grunt" type="radio" onChange={this.props.handler} label='Grunt' checked={this.props.data.grunt} />
        </label>
      </div>
    )
  }
});

module.exports = ServerComponent;
