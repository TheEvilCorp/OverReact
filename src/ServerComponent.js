import React, { Component } from 'react';
import { Input } from 'react-bootstrap';

export default class ServerComponent extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props !== nextProps;
  }

  render = () => {
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
};
