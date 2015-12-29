const isBrowser = typeof window !== undefined;
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Application from './Application';
import WhatNext from './Whatnext';
import Footer from './Footer';
import {Navbar} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import DownloadModal from './DownloadModal';
import postFunction from '../js/widgetHelpers/postFunction';
import FormModal from './FormModal';
import styles from './styles';
var $ = isBrowser ? require('jquery') : undefined;

export default class App extends Component {
  state = {
    hash: null,
    downloadModal: false,
    formModal: false
  }

  componentDidMount = () => {
    let userId = localStorage.getItem('userId');
    if (!userId){
      userId = 'anonymous' + Math.round(Math.random() * 1000000000)
      userId = userId.toString()
      localStorage.setItem('userId', userId)
    }
    mixpanel.identify(userId);
    mixpanel.people.set_once('$first_name', userId);
    mixpanel.track('Page Load');
  }

  submit = (hash) => {
    this.setState({
      downloadModal: true,
      hash: hash
    });
  }

  feedback = (e) => {
    e.preventDefault();
    this.setState({
      formModal: true,
    })
  }

  hideModal = () => {
    this.setState({
      downloadModal: false,
      formModal: false
    });
  }

  render = () => {
    return (
      <div>
        <nav style={styles.navbar} fixedTop={true} id='nav-section'>
          OverReact
          <sup style={styles.sup}>Beta Version</sup>
        </nav>
        <Home css={styles.Home}/>
        <Application id={this.state.id} hash={this.state.hash} submit={this.submit}/>
        <WhatNext />
        <Footer formModal={this.feedback}/>
        <DownloadModal show={this.state.downloadModal} onHide={this.hideModal} hash={this.state.hash}/>
        <FormModal show={this.state.formModal} onHide={this.hideModal} screenshot={this.state.screenshot}/>
      </div>
    )
  }
}
