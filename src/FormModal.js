const isBrowser = typeof window !== undefined;
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Input} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {ButtonInput} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
var $ = isBrowser ? require('jquery') : undefined;

export default class FormModal extends Component {
  state = {
    name: null,
    email: null,
    category: 'Reason for contacting',
    feedback: null,
    submitted: false,
  }

  dropdownSelection = (e, eKey) => {
    this.setState({
      category: e.target.text
    })
  }

  feedbackSubmission = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target[0].value,
      email: e.target[1].value,
      feedback: e.target[3].value
    }, () => {
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
        success: (response) => {
          this.setState({
          submitted: true
          })
        }
      });
    });
  }

  hidden = () => {
    this.props.onHide();
    this.setState({
      submitted: false
    })
  }

  render = () => {
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
    )
  }
};
