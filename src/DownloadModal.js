const isBrowser = typeof window !== undefined;
import React, {Component} from 'react';
import { Modal, Glyphicon, Input, Button, ButtonInput, Tooltip, OverlayTrigger } from 'react-bootstrap';
import ReactZeroClipboard from 'react-zeroclipboard';
var $ = isBrowser ? require('jquery') : undefined;

export default class DownloadModal extends Component {
  downloadZip = () => {
    mixpanel.track('Download Using Download Button');
    window.location.href = `/download/:${this.props.hash}`;
  }

  render() {
    let innerGlyphicon = <Glyphicon id="glyph" glyph="copy" />;
    let command = 'overreact ' + this.props.hash;
    let tooltip = <Tooltip id='copied' className='in' title='Copied to clipboard!'>Copied to clipboard!</Tooltip>;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} hash={this.props.hash}>
        <Modal.Header closeButton>
          <Modal.Title>Your Files Are Ready For Download!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Method 1: The Cool Way</h4>
          <ol>
            <p><i>Note: Method #1 currently works for Macs only. Windows users, see Method #2</i></p>
            <li>Install our npm package <a target="_blank" href='https://www.npmjs.com/package/over-react'>here</a> or just type in 'sudo npm install over-react -g' in your terminal.</li>
            <li>Once the package is installed, click the clipboard icon to copy the following commands to your clipboard</li>
            <li>Open your terminal, navigate to the folder you would like to install the project into, paste from your clipboard, and press enter</li>
            <OverlayTrigger trigger='click' placement='right' overlay={tooltip}>
              <span>
              <ReactZeroClipboard text={command} >
                <Button addonAfter={innerGlyphicon} bscfont='courier' id='pasteable'>{command}</Button>
              </ReactZeroClipboard>
              </span>
            </OverlayTrigger>
            <li>If you chose to include server and task runner files, type npm install and npm start in the terminal to load everything up.<br />
            The default URL for your server is http://localhost:3000</li>
          </ol>
        <h4>Method 2: The Other Way</h4>
          <ol>
            <li>Click the download button below to receive your files as a zip download</li>
            <li>See step 4 above</li>
            <Button style={{textAlign: 'center', marginLeft: '200px'}} onClick={this.downloadZip}>Download</Button>
          </ol>
        </Modal.Body>
      </Modal>
    )
  }
};
