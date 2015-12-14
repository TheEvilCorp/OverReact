var React = require('react');


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
        <div>
          <ul>
            <li><a href="mailto:OverReact.EvilCorp@gmail.com">Feedback</a></li>
            <li><a target="_blank" href="https://github.com/TheEvilCorp/OverReact/tree/version1">Github</a></li>
          </ul>
          <div>
            <p>Brought to you by the good folks at Evil Corp</p>
            <a target="_blank" href='https://shop.stjude.org/GiftCatalog/donation.do?cID=13805&pID=24591&sc_icid=lz-tg-btn-donate-now'>Donate Here</a>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Footer;
