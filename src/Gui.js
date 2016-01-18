const isBrowser = typeof window !== undefined;
import React, { Component } from 'react';
import widget from './../js/widget';
var $ = isBrowser ? require('jquery') : undefined;

export default class Gui extends Component {
  componentDidMount = () => {
    widget();
  };
  render() {
    return (
      <section id='overReact-sectionNotContainer'>
        <div id='gui-header'>
          <h3 id='Apptext'>App</h3>
          <p id='dup-warning'>React does not allow duplicate component names</p>
        </div>
        <div id='overReact-container'></div>
      </section>
    )
  };
};
