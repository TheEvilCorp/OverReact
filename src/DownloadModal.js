var React = require('react');
var $ = require('jquery');
var Modal = require('react-bootstrap').Modal;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Input = require('react-bootstrap').Input;
var postFunction = require('../js/widgetHelpers/postFunction');
var Button = require('react-bootstrap').Button;
var ReactZeroClipboard = require('react-zeroclipboard');
var Tooltip = require('react-bootstrap').Tooltip;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;

var DownloadModal = React.createClass({
  downloadZip: function() {
    window.location.href = `/download/:${this.props.hash}`;
  },
  render: function () {
    var innerGlyphicon = <Glyphicon glyph="copy" />;
    var command = 'overreact ' + this.props.hash;
    var tooltip = <Tooltip id='copied' className='in' title='Copied to clipboard!'>Copied to clipboard!</Tooltip>;

    return (
      <Modal show={this.props.show} onHide={this.props.onHide} hash={this.props.hash}>
        <Modal.Header closeButton>
          <Modal.Title>Your Files Are Ready For Download!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Method 1</h4>
          <p>1. Click the clipboard icon to copy the following commands to your clipboard.</p>
          <p>2. Open your terminal, navigate to the correct folder, paste and run.</p>
          <OverlayTrigger trigger='click' placement='bottom' overlay={tooltip}>
            <ReactZeroClipboard text={command}>
              <Input font='courier' id='pasteable' type='text' readOnly='true' addonAfter={innerGlyphicon} value={command} />
            </ReactZeroClipboard>
          </OverlayTrigger>
          <h4>Method 2</h4>
          <p>Click this download button to receive your files as a zip download</p>
          <Button onClick={this.downloadZip}>Download</Button>
        </Modal.Body>
      </Modal>
    )
  }
});

module.exports = DownloadModal;
