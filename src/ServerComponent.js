var React = require('react');
var Input = require('react-bootstrap').Input


var ServerComponent = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.props !== nextProps ? true : false;
  },
  render: function () {
    return (
      <div className='radio-sections'>
        <p>Choose a server</p>
        <label className="radio-inline" className='radio-btns'>
          <Input name="servers" id="express" value="express" type="radio" onChange={this.props.handler} label='Express'  checked={this.props.data.express} />
        </label>
        <label className="radio-inline" className='radio-btns'>
          <Input name="servers" id="hapi" value="hapi" type="radio" onChange={this.props.handler} label='Hapi' checked={this.props.data.hapi} />
        </label>
      </div>
    )
  }
});

module.exports = ServerComponent;
