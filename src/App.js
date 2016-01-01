const isBrowser = typeof window !== undefined;
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Application from './Application';
import WhatNext from './Whatnext';
import Footer from './Footer';
import { Navbar, Modal, Glyphicon, Input } from 'react-bootstrap';
import DownloadModal from './DownloadModal';
import FormModal from './FormModal';
import Styles from './Styles';
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
    var that = this;
    console.log('clicked feedback');
    html2canvas(document.body, {
      onrendered: function(canvas) {
        var dataURL = canvas.toDataURL("image/png");
        console.log(dataURL);
        that.setState({
          screenshot: dataURL.replace(/^data:image\/(png|jpg);base64,/, ""),
          formModal: true
        });
      }
    });
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
        <div style={Styles.navbar} fixedTop={true} id='nav-section'>
          OverReact
          <sup style={Styles.sup}>Beta Version</sup>
        </div>
        <Home />
        <Application id={this.state.id} hash={this.state.hash} submit={this.submit}/>
        <WhatNext />
        <Footer formModal={this.feedback}/>
        <DownloadModal show={this.state.downloadModal} onHide={this.hideModal} hash={this.state.hash}/>
        <FormModal show={this.state.formModal} onHide={this.hideModal} screenshot={this.state.screenshot}/>
      </div>
    )
  }
}
