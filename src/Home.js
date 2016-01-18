const isBrowser = typeof window !== undefined;
import React, {Component} from 'react';
import Instructions from './Instructions';
import styles from './Styles';
var $ = isBrowser ? require('jquery') : undefined;

export default class Home extends Component {
  setFocus = (e) => {
    e.preventDefault();
    mixpanel.track('Clicked Start A React Project');
    $('html, body').animate({
        scrollTop: $('#application-section').offset().top,
    }, 500);
  };

  render() {
    return (
      <div style={styles.Home.homeSection} >
        <div style={styles.Home.flexContainer} >
        <h1 style={styles.Home.homeHeader} >The React File Generator</h1>
        <p style={styles.Home.homeParagraph} >Wireframe React components and download starter files with one click</p>
        <button onClick={this.setFocus} style={styles.Home.getStarted}>Start a React Project</button>
        </div>
        <Instructions css={styles.Home.Instructions} />
      </div>
    )
  };
};
