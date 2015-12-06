
  
function handleRadioBtnChange(e) {
  console.log('handle radio button change in module')
  this.setState({ express: $('#express').prop('checked')});
  this.setState({ hapi: $('#hapi').prop('checked')});
  this.setState({ gulp: $('#gulp').prop('checked')});
  this.setState({ grunt: $('#grunt').prop('checked')});

  if($('#express').prop('checked')) {
    this.setState({ express: true });
    this.setState({ hapi: false });
  }
  if($('#hapi').prop('checked')) {
    this.setState({ hapi: true });
    this.setState({ express: false });
  }
  if($('#gulp').prop('checked')) {
    this.setState({ gulp: true });
    this.setState({ grunt: false });
  }
  if($('#grunt').prop('checked')) {
    this.setState({ grunt: true });
    this.setState({ gulp: false });
  }
}

module.exports = handleRadioBtnChange;