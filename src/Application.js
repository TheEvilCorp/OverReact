import React, { Component } from 'react';
import Gui from './Gui';
import Options from './Options';

export default class Application extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return this.props !== nextProps;
  }

  render() {
    return (
      <div className='appContainer' id='application-section'>
        <Gui className='appChild'/>
        <Options className='appChild' submit={this.props.submit}/>
      </div>
    )
  }
};
