import React, {Component} from'react';
import styles from './styles';

export default class Instructions extends Component {
  render() {
    return (
      <div style={styles.Home.Instructions.instructionsSection}>
        <div style={styles.Home.Instructions.instructions}>
          <div>
            <img style={styles.Home.Instructions.instructionsImg} src="/images/instruction1.png" alt="242x200"/>
            <h3 style={styles.Home.Instructions.instructionsHr} >Create your first component</h3>
            <p style={styles.Home.Instructions.instructionsParagraph} >Input a component name and hit enter.</p>
          </div>
        </div>
        <div style={styles.Home.Instructions.instructions}>
          <div>
            <img style={styles.Home.Instructions.instructionsImg} src="/images/instruction2.png" alt="242x200"/>
            <h3 style={styles.Home.Instructions.instructionsHr} >Layout your components</h3>
            <p style={styles.Home.Instructions.instructionsParagraph} >Drag, drop, resize and nest components.</p>
            <p style={styles.Home.Instructions.instructionsParagraph} >Double-click on component name to edit.</p>
          </div>
        </div>
        <div style={styles.Home.Instructions.instructions}>
          <div>
            <img style={styles.Home.Instructions.instructionsImg} src="/images/instruction3.png" alt="242x200"/>
            <h3 style={styles.Home.Instructions.instructionsHr} id="selectOptions">Select Options</h3>
            <p style={styles.Home.Instructions.instructionsParagraph} >Click "Download" to get the starter files</p>
          </div>
        </div>
      </div>
    )
  }
};
