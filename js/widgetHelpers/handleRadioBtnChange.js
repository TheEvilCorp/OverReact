
function handleRadioBtnChange(component) {
  component.setState({ express: $('#express').prop('checked')});
  component.setState({ hapi: $('#hapi').prop('checked')});
  component.setState({ gulp: $('#gulp').prop('checked')});
  component.setState({ grunt: $('#grunt').prop('checked')});

  if($('#express').prop('checked')) {
    component.setState({ express: true });
    component.setState({ hapi: false });
  }
  if($('#hapi').prop('checked')) {
    component.setState({ hapi: true });
    component.setState({ express: false });
  }
  if($('#gulp').prop('checked')) {
    component.setState({ gulp: true });
    component.setState({ grunt: false });
  }
  if($('#grunt').prop('checked')) {
    component.setState({ grunt: true });
    component.setState({ gulp: false });
  }
}

module.exports = handleRadioBtnChange;