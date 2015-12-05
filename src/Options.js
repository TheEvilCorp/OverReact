var React = require('react');
var $ = require('jquery');
var Input = require('react-bootstrap').Input
var Button = require('react-bootstrap').Button

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
  disableRadioButtons: function(){
    this.setState({ express: false });
    this.setState({ hapi: false });
    this.setState({ gulp: false });
    this.setState({ grunt: false });
  },


  enableRadioButtons: function() {
    this.setState({ express: true });
    this.setState({ hapi: false });
    this.setState({ gulp: true });
    this.setState({ grunt: false });

    
    //takes care of bootstrap radio button bug - sometimes button is clicked, state will change, but button will not reflect clicked status with blue fill
    // if(!$('#express').prop('checked') && !$('#hapi').prop('checked')) {
    //   $('#express').prop('checked', true);
    //   this.setState({ express: true });
    //   this.setState({ hapi: false });
    // } 
    // if(!$('#gulp').prop('checked') && !$('#grunt').prop('checked')) {
    //   $('#gulp').prop('checked', true);
    //   this.setState({ gulp: true });
    //   this.setState({ grunt: false });
    // }
  },
  handleBasicBtnChange: function(e) {
    //state of checked property explicitly checked because of bootstrap button bug - sometimes button is clicked, state will change, but checkbox does not reflect checked status
    if(!this.state.basic) {
      this.setState({ basic: true });
      this.disableRadioButtons();
    } else {
      this.setState({ basic: false });
      this.enableRadioButtons();
    }
  },
  handleRadioBtnChange: function(e) {
    var id = e.target.id;
    console.log('ID: ', id)
    // this.setState({ express: $('#express').prop('checked')});
    // this.setState({ hapi: $('#hapi').prop('checked')});
    // this.setState({ gulp: $('#gulp').prop('checked')});
    // this.setState({ grunt: $('#grunt').prop('checked')});

    if(id === 'express') {
      this.setState({ express: !this.state.express });
      this.setState({ hapi: !this.state.express });
    }
    if(id === 'hapi') {
      this.setState({ hapi: !this.state.hapi });
      this.setState({ express: !this.state.hapi });
    }

    // if($('#hapi').prop('checked')) {
    //   this.setState({ hapi: true });s
    //   this.setState({ express: false });
    // }
    // if($('#gulp').prop('checked')) {
    //   this.setState({ gulp: true });
    //   this.setState({ grunt: false });
    // }
    // if($('#grunt').prop('checked')) {
    //   this.setState({ grunt: true });
    //   this.setState({ gulp: false });
    // }
    // this.enableRadioButtons();
  },

  render: function () {
    console.log('IN PROP EXPRESS: ', $('#express').prop('checked'))
    console.log('in state express: ', this.state.express)
    console.log('IN PROP HAPI: ', $('#hapi').prop('checked'))
    console.log('in state hapi: ', this.state.hapi)
    console.log('IN PROP GULP: ', $('#gulp').prop('checked'))  
    console.log('in state gulp: ', this.state.gulp)
    console.log('IN PROP GRUNT: ', $('#grunt').prop('checked'))
    console.log('in state grunt: ', this.state.grunt)
    return (
      <div id='options-section'>
        <h3>Options</h3>
        <Button id='submitButton'>Download Files</Button>

        <div className='form-group'>   
          <Input type='text' label='Project Name' id='projectName' onKeyPress = {this.handleProjectName} required />
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
