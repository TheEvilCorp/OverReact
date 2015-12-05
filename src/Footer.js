var React = require('react');
var $ = require('jquery');


var Footer = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function () {
    var styleObj = {
      textAlign: 'center'
    };

    return (
      <div style={styleObj} id='footer-section'>
        <br />
        Brought to you by the good folks at Evil Corp<br />
      <a href='https://shop.stjude.org/GiftCatalog/donation.do?cID=13805&pID=24591&sc_icid=lz-tg-btn-donate-now'>Donate Here</a>
      </div>
    )
  }
});

module.exports = Footer;
