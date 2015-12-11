var React = require('react');
var $ = require('jquery');


var Footer = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    var styleObj = {
      textAlign: 'center',
    };

    return (
      <div style={styleObj} id='footer-section'>
        <div className='footerFlexContainer'>
          <span className='footerFlexItem'>
            <a id='feedback' href="mailto:OverReact.EvilCorp@gmail.com">Feedback</a>
            <a target="_blank" href="https://github.com/TheEvilCorp/OverReact/tree/version1">Github</a>
          </span>
          <div className='footerFlexItem'>
            <p>Brought to you by the good folks at Evil Corp</p>
          </div>
          <a className='footerFlexItem' target="_blank" href='https://shop.stjude.org/GiftCatalog/donation.do?cID=13805&pID=24591&sc_icid=lz-tg-btn-donate-now'>Donate Here</a>
        </div>
      </div>
    )
  }
});

module.exports = Footer;
