import React, {Component} from'react';
import styles from './Styles';

export default class Instructions extends Component {
  render() {
    return (
      <div style={styles.Home.Instructions.instructionsSection}>
        <img src="/images/Demo3_optimized.gif" alt="HTML5 Icon" width="650px"/>
      </div>
    )
  }
};
