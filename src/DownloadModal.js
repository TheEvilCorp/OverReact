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
    let macCommand = `curl -O https://overreact.io/zips/${this.props.hash}.zip &&
    unzip -qq -d ./${this.props.projectName} ${this.props.hash}.zip &&
    mv ./${this.props.projectName}/*/* ${this.props.projectName} &&
    rm -rf ./${this.props.projectName}/${this.props.hash} &&
    rm -rf ${this.props.hash}.zip`;
    console.log(`hash: ${this.props.hash} projectName: ${this.props.projectName}`);
    console.log(macCommand);
    let tooltip = <Tooltip id='copied' className='in' title='Copied to clipboard!'>Copied to clipboard!</Tooltip>;
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} hash={this.props.hash}>
        <Modal.Header closeButton>
          <Modal.Title>Your Files Are Ready For Download!</Modal.Title>
          <p>For NPM package and Mac users, click to copy command, then paste into terminal</p>
        </Modal.Header>
        <Modal.Body>
          <h4>NPM Package Users</h4>
            <OverlayTrigger trigger='click' placement='right' overlay={tooltip}>
              <span>
              <ReactZeroClipboard text={command} id='copyOverlay'>
                <Button addonAfter={innerGlyphicon} bscfont='courier' id='pasteable'><span id='commandText'>{command}</span></Button>
              </ReactZeroClipboard>
              </span>
            </OverlayTrigger>
          <h4>Mac Users</h4>
            <OverlayTrigger trigger='click' placement='right' overlay={tooltip}>
              <span>
              <ReactZeroClipboard text={macCommand} id='copyOverlay'>
                <Button addonAfter={innerGlyphicon} bscfont='courier' id='pasteable'><span id='commandText'>{macCommand}</span></Button>
              </ReactZeroClipboard>
              </span>
            </OverlayTrigger>
        <h4>Windows Users</h4>
            <Button bsStyle='primary' style={{textAlign: 'center'}} onClick={this.downloadZip} block>Download</Button>
        </Modal.Body>
      </Modal>
    )
  }
};
