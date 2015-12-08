var React = require('react');
var $ = require('jquery');
var Button = require('react-bootstrap').Button
var handleRadioButton = require('./../js/widgetHelpers/handleRadioBtnChange');
var postFunction = require('../js/widgetHelpers/postFunction');
var ProjectName = require('./ProjectName');
var ServerComponent = require('./ServerComponent');
var TaskRunnerComponent = require('./TaskRunnerComponent');
var BasicOptions = require('./BasicOptions');

var Options = React.createClass({
  getInitialState: function() {
    return {
      projectName: '',
      basic: false,
      es6: false,
      express: true,
      hapi: false,
      gulp: true,
      grunt:false,
    };
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    return this.state !== nextState ? true : false;
  },
  updateProjectName: function(e) {
    this.setState({
        projectName: e.target.value.replace(/\s/g, '_').replace(/[^\w]+/g, '')
      })
  },

  handleButtonChange: function(e) {
    this.setState(handleRadioButton(e, this.state));
  },

  post: function() {
    postFunction(this.state, this.props.submit);
  },

  render: function () {
    return (
      <div id='options-section'>
        <h3>Options</h3>
        <div className='form-group'>
          <ProjectName key='projectName' data={this.state.projectName} handler={this.updateProjectName}/>
          <hr></hr>
          <BasicOptions key='basic' data ={this.state} handler={this.handleButtonChange}/>
          <hr></hr>
          <ServerComponent key='server' data={this.state} handler={this.handleButtonChange}/>
          <hr></hr>
          <TaskRunnerComponent key='task' data={this.state} handler={this.handleButtonChange}/>
          <hr></hr>
        </div>
        <Button id='submitButton' bsSize='large' onClick={this.post} >Download Files</Button>
      </div>
    )
  }
});

module.exports = Options;
