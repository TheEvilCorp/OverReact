import React, { Component } from 'react';

export default class Footer extends Component {
  trackDonate() {
    mixpanel.track('Clicked Donate');
  }

  render() {
    let styleObj = {
      textAlign: 'center',
    };

    let mixPanelImg = {
      margin: 'auto',
      paddingRight: '30px'
    };

    return (
      <div style={styleObj} id='footer-section'>
        <div className='footerFlexContainer'>
          <span className='footerFlexItem'>
            <a id='feedback' href='' onClick={this.props.formModal}>Feedback</a>
          </span>
          <span style={styleObj} className='footerFlexItem' id='brought'>Brought to you by the good folks at Evil Corp</span>
           <a style={mixPanelImg} href="https://mixpanel.com/f/partner" rel="nofollow"><img src="//cdn.mxpnl.com/site_media/images/partner/badge_light.png" alt="Mobile Analytics" /></a>
        </div>
      </div>
    )
  }
};
