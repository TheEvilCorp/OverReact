import React, { Component } from 'react';
import { Input } from 'react-bootstrap';

export default class ServerComponent extends Component {

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props !== nextProps;
  };

  render() {
    return (
      <div className='radio-sections'>
        <p>Choose a task runner</p>
        <label className="radio-inline" className='radio-btns'>
          <Input name="taskRunners" id="gulp" value="gulp" type="radio" onChange={this.props.handler} label='Gulp' checked={this.props.data.gulp} />
        </label>
        <label className="radio-inline" className='radio-btns'>
          <Input name="taskRunners" id="grunt" value="grunt" type="radio" onChange={this.props.handler} label='Grunt' checked={this.props.data.grunt} />
        </label>
        <label className="radio-inline" className='radio-btns'>
          <Input name="taskRunners" id="webpack" value="webpack" type="radio" onChange={this.props.handler} label='Webpack' checked={this.props.data.webpack} />
        </label>
      </div>
    )
  };
};
