var createDataObj = require('./createDataObj');
var readFormData = require('./readFormData');

module.exports = function(state, callback) {
  //Retrieves data from form
  var form = readFormData(state)
  //interprets the DOM into an object
  var dataObj = {
    name: 'app',
    children:[],
    position: $('#overReact-container').position(),
    height: $('#overReact-container').height(),
    width: $('#overReact-container').width()
  };

  createDataObj(dataObj, '#overReact-container');

  //post request to create React files and download the zip
  $.ajax({
    method: 'POST',
    url: '/submit',
    contentType: 'application/json',
    data: JSON.stringify({
      projectName: form.projectName || 'myOverReactProject',
      main: dataObj,
      server: form.server,
      task: form.task,
      template: form.es6,
    }),
    //this initiates download once the file is zipped
    success: function(uniqueID){
      callback(uniqueID);
    },
    error: function(err){
      console.log('ERROR: ', err);
    }
  });
};
