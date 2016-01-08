import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    let styleObj = {
      textAlign: 'center',
    };
    return (
      <div style={styleObj} id='footer-section'>
        <div className='footerFlexContainer'>
          <span className='footerFlexItem'>
            <a id='feedback' href='' onClick={this.props.formModal}>Feedback</a>
          </span>
          <span style={styleObj} className='footerFlexItem' id='brought'>Brought to you by <a href='http://www.linkedin.com/in/briangrober'>Brian</a>, <a href='http://www.linkedin.com/in/ricomoorer'>Rico</a> and <a href='http://www.linkedin.com/in/susantashiro'>Susan</a> </span>
          <a className='footerFlexItem' target="_blank" href='https://shop.stjude.org/GiftCatalog/donation.do?cID=13805&pID=24591&sc_icid=lz-tg-btn-donate-now'>Donate Here</a>
        </div>
      </div>
    )
  }
};
