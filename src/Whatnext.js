import React, { Component } from 'react';
import { Well } from 'react-bootstrap';

export default class WhatNext extends Component {
  render() {
    return (
      <div id='whatNext-section'>
        <h2>What Next?</h2>
        <Well bsSize='small'><p>1) Move the unzipped files to your project directory</p></Well>
        <Well bsSize='small'><p>2) Navigate to your project folder in the command line</p></Well>
        <Well bsSize='small'><p>3) Run &nbsp;&nbsp;<span className='terminal-text'>npm install</span></p></Well>
        <Well bsSize='small'>
          <p>4) Run &nbsp;&nbsp;<span className='terminal-text'>npm run start-dev</span></p>
        </Well>
        <Well bsSize='small'><p>5) Open your browser and go to http://localhost:3000</p></Well>
      </div>
    )
  };
};
