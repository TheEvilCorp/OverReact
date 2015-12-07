var React = require('react');
var $ = require('jquery');
var Input = require('react-bootstrap').Input
var Button = require('react-bootstrap').Button
var handleRadioButton = require('./../js/widgetHelpers/handleRadioBtnChange');
var enableRadioBtns = require('./../js/widgetHelpers/enableRadioButtons');
var postFunction = require('../js/widgetHelpers/postFunction');

var Options = React.createClass({
  getInitialState: function() {
    return {
      basic: false,
      express: true,
      hapi: false,
      gulp: true,
      grunt:false
    };
  },
  
  handleBasicBtnChange: function() {
    
    if(!this.state.basic) {
      this.setState({ basic: true });
      this.setState({ express: false });
      this.setState({ hapi: false });
      this.setState({ gulp: false });
      this.setState({ grunt: false });
    } else {
      this.setState({ basic: false });
      enableRadioBtns(this);
    }
  },

  handleRadioBtnChange: function() {
    handleRadioButton(this)
    enableRadioBtns(this)
  },
  
  post: function() {
    postFunction(this.props.id, this.props.hash);
  },

  render: function () {
    return (
      <div id='options-section'>
        <h3>Options</h3>
        <div className='form-group'>
          <Input type='text' label='Project Name' id='projectName' onKeyPress={this.handleProjectName} required />
          <hr></hr>
          <p id='basic-options'>Basic Options</p>
          <Input type="checkbox" label="React javascript files only" id='basic' onChange={this.handleBasicBtnChange} readOnly checked={this.state.basic} />
          <hr></hr>
          <div className='radio-sections'>
            <p>Choose a server</p>
            <label className="radio-inline" className='radio-btns'>
              <Input name="servers" id="express" value="express" type="radio" onChange={this.handleRadioBtnChange} label='Express' checked={this.state.express} />
            </label>
            <label className="radio-inline" className='radio-btns'>
              <Input name="servers" id="hapi" value="hapi" type="radio" onChange={this.handleRadioBtnChange} label='Hapi' checked={this.state.hapi} />
            </label>
          </div>
          <hr></hr>
          <div className='radio-sections'>
            <p>Choose a task runner</p>
            <label className="radio-inline" className='radio-btns'>
              <Input name="taskRunners" id="gulp" value="gulp" type="radio" onChange={this.handleRadioBtnChange} label='Gulp' checked={this.state.gulp} />
            </label>
            <label className="radio-inline" className='radio-btns'>
              <Input name="taskRunners" id="grunt" value="grunt" type="radio" onChange={this.handleRadioBtnChange} label='Grunt' checked={this.state.grunt} />
            </label>
          </div>
          <hr></hr>
        </div>
        <Button id='submitButton' bsSize='large' onClick={this.post} >Download Files</Button>
      </div>
    )
  }
});

module.exports = Options;

        // <div id='template-buttons'>
          //   <Button id='saveButton'>Save Template</Button>
          //   <Button id='loadButton'>Load Template</Button>
          // </div>
