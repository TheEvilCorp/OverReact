import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import HandleRadioButton from './../js/widgetHelpers/handleRadioBtnChange';
import PostFunction from '../js/widgetHelpers/postFunction';
import ProjectName from './ProjectName';
import ServerComponent from './ServerComponent';
import TaskRunnerComponent from './TaskRunnerComponent';
import BasicOptions from './BasicOptions';

export default class Options extends Component {
  state = {
    projectName: '',
    basic: false,
    es6: false,
    express: true,
    hapi: false,
    gulp: true,
    grunt:false,
    webpack: false
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state !== nextState;
  };

  updateProjectName = (e) => {
    this.setState({
        projectName: e.target.value.replace(/\s/g, '_').replace(/[^\w]+/g, '')
      })
  };

  handleButtonChange = (e) => {
    this.setState(HandleRadioButton(e, this.state));
  };

  post = () => {
    mixpanel.track('Clicked Generate Files Button');
    PostFunction(this.state, this.props.submit);
  };

  render () {
    return (
      <section id='options-section'>
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
        <Button id='submitButton' bsSize='large' onClick={this.post} >Generate Files</Button>
      </section>
    )
  };
}
