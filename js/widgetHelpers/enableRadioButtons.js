function enableRadioButtons() {
  this.setState({ basic: false });

  //takes care of bootstrap radio button bug - sometimes button is clicked, state will change, but button will not reflect clicked status with blue fill
  if(!$('#express').prop('checked') && !$('#hapi').prop('checked')) {
    $('#express').prop('checked', true);
    this.setState({ express: true });
    this.setState({ hapi: false });
  } 
  if(!$('#gulp').prop('checked') && !$('#grunt').prop('checked')) {
    $('#gulp').prop('checked', true);
    this.setState({ gulp: true });
    this.setState({ grunt: false });
  }
}

module.exports = enableRadioButtons;