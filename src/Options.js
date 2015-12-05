var React = require('react');
var $ = require('jquery');
var Input = require('react-bootstrap').Input
var Button = require('react-bootstrap').Button
var postFunction = require('../js/widgetHelpers/postFunction');

var Options = React.createClass({
  getInitialState: function() {
    return {
      isChecked: false
    };
  },
  disableRadioButtons: function() {
    $('#express').prop('checked', false);
    $('#hapi').prop('checked', false);
    $('#gulp').prop('checked', false);
    $('#grunt').prop('checked', false);
  },
  disableBasicOptions: function(){
    $('#js-only').prop('checked',false);
  },
  setButtonDefaults: function() {
    $('#js-only').prop('checked',false);
    $('#express').prop('checked', true);
    $('#gulp').prop('checked', true);
  },
  post: function() {
    postFunction(this.props.id, this.props.hash);
  },
  handleChange: function(){
    // this.setState({isChecked: !this.state.isChecked});
    // console.log(this.state.isChecked);
    // if(this.state.isChecked) {
    //   disableRadioButtons();
    // } else {
    //   setButtonDefaults();
    // }

  },
  componentDidMount: function(){
    $('#express').prop('checked', true);
    $('#gulp').prop('checked', true);
  },

  render: function () {
    return (
      <div id='options-section'>
        <h3>Options</h3>
        {this.props.hash}
        <Button id='submitButton' onClick={this.post}>Download Files</Button>

        <div className='form-group'>
          <Input type='text' label='Project Name'></Input>
          <hr></hr>
          <p id='basic-options'>Basic Options</p>
          <Input type="checkbox" label="React javascript files only" id='js-only' onChange={this.handleChange} readOnly />
          <hr></hr>
          <div className='radio-sections'>
            <p>Choose a server</p>
            <label className="radio-inline" className='radio-btns'>
              <input name="servers" id="express" value="express" type="radio" onChange={this.handleChange} >  Express</input>
            </label>
            <label className="radio-inline" className='radio-btns'>
              <input name="servers" id="hapi" value="hapi" type="radio" onChange={this.handleChange}>  Hapi</input>
            </label>
          </div>
          <hr></hr>
          <div className='radio-sections'>
            <p>Choose a task runner</p>
            <label className="radio-inline" className='radio-btns'>
              <input name="taskRunners" id="gulp" value="gulp" type="radio" onChange={this.handleChange}>  Gulp</input>
            </label>
            <label className="radio-inline" className='radio-btns'>
              <input name="taskRunners" id="grunt" value="grunt" type="radio" onChange={this.handleChange}>  Grunt</input>
            </label>
          </div>
          <hr></hr>
          <div id='template-buttons'>
            <Button id='saveButton'>Save Template</Button>
            <Button id='loadButton'>Load Template</Button>
          </div>
        </div>

      </div>
    )
  }
});

module.exports = Options;
