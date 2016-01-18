import React, {Component} from 'react';
import {Input} from 'react-bootstrap';

export default class BasicOptions extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props !== nextProps;
  };

  render() {
    return (
      <div>
        <p id='basic-options'>Basic Options</p>
        <Input type="checkbox" label="React component files only" id='basic' onChange={this.props.handler} readOnly checked={this.props.data.basic} />
        <Input type="checkbox" label="ES6 Format" id='es6' onChange={this.props.handler} readOnly checked={this.props.data.es6} />
      </div>
    )
  };
}
