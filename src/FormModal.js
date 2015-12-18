const isBrowser = typeof window !== undefined;
var React = require('react');
var $ = isBrowser ? require('jquery') : undefined;
var Modal = require('react-bootstrap').Modal;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;
var ButtonInput = require('react-bootstrap').ButtonInput;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;


var FormModal = React.createClass({
  getInitialState() {
    return {
      name: null,
      email: null,
      category: 'Reason for contacting',
      feedback: null,
      submitted: false,
    }
  },
  dropdownSelection(e, eKey) {
    this.setState({
      category: e.target.text
    })
  },
  feedbackSubmission(e) {
    e.preventDefault();
    this.setState({
      name: e.target[0].value,
      email: e.target[1].value,
      feedback: e.target[3].value
    }, function(){
      $.ajax({
        method: 'POST',
        url: '/feedback',
        contentType: 'application/json',
        data: JSON.stringify({
          screenshot: this.props.screenshot,
          payload: {
            username: 'Feedback-Bot',
            icon_emoji: ':dog:',
            text: this.state.feedback,
            attachments: [
              {
                pretext: `New Feedback from ${this.state.name} - ${this.state.email}`,
                title: this.state.category
              }
            ]
          }
        }),
        success: function(response){
          this.setState({
          submitted: true
        })
      }.bind(this)
    })}.bind(this));
  },
  hidden() {
    this.props.onHide();
    this.setState({
      submitted: false
    })
  },
  render: function () {
    return (
      <Modal show={this.props.show} onHide={this.hidden}>
        {!this.state.submitted ?
        (<div>
          <Modal.Header closeButton>
            <Modal.Title>Issues, Suggestions, or Feedback! Oh My!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.feedbackSubmission}>
              <Input required type="text" label="Name" id='formNameField'/>
              <hr/>
              <Input required type="email" label="Email" id="formEmailField"/>
              <hr/>
              <DropdownButton onSelect={this.dropdownSelection} title={this.state.category} id='categoriesDropDown'>
                <MenuItem eventKey="1">Issues / Bugs</MenuItem>
                <MenuItem eventKey="2">Suggestions</MenuItem>
                <MenuItem eventKey="3">General Feedback / Questions</MenuItem>
              </DropdownButton>
              <Input type="textarea" label="Text Area" placeholder="Enter your feedback here..." />
              <ButtonInput type="submit" value="Submit Button" />
            </form>
          </Modal.Body>
        </div>)
        :
      (<div>
        <Modal.Header closeButton>
          <Modal.Title>Thanks for your submission!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>We appreciate the feedback and will do our best to address your issues/suggestions as soon as possible.</p>
          <br/>
          <p>Thanks for using OverReact!</p>
        </Modal.Body>
      </div>)}
    </Modal>
  )}
});

module.exports = FormModal;
