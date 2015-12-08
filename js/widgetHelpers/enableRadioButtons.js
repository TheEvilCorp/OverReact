function enableRadioButtons(component) {
  component.setState({ basic: false });

  //takes care of bootstrap radio button bug - sometimes button is clicked, state will change, but button will not reflect clicked status with blue fill
  if(!$('#express').prop('checked') && !$('#hapi').prop('checked')) {
    $('#express').prop('checked', true);
    component.setState({ express: true });
    component.setState({ hapi: false });
  } 
  if(!$('#gulp').prop('checked') && !$('#grunt').prop('checked')) {
    $('#gulp').prop('checked', true);
    component.setState({ gulp: true });
    component.setState({ grunt: false });
  }
}

module.exports = enableRadioButtons;