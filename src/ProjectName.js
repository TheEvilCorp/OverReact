import React, { Component } from 'react';
import { Input } from 'react-bootstrap';

export default class ProjectName extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props !== nextProps ? true : false;
  };

  render() {
    return (
      <Input onChange={this.props.handler} type='text' label='Project Name' id='projectName' pattern="[a-zA-Z0-9_ ]+" required/>
    )
  };
};
