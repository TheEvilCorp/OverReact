var createDataObj = require('./createDataObj');
var readFormData = require('./readFormData')

module.exports = function() {
  //Retrieves data from form
  var form = readFormData();

  //interprets the DOM into an object
  var dataObj = {
    name: 'app',
    children:[],
    position: $('#overReact-container').position(),
    height: $('#overReact-container').height(),
    width: $('#overReact-container').width()
  };

  createDataObj(dataObj, '#overReact-container');
  console.log(form)

  //post request to create React files and download the zip
  $.ajax({
    method: 'POST',
    url: '/submit',
    contentType: 'application/json',
    data: JSON.stringify({
      projectName: form.projectName,
      main: dataObj,
      server: form.server,
      task: form.task
    }),
    //this initiates download once the file is zipped
    success: function(){
      window.location.href = `/download/:${form.projectName}`;
    },
    error: function(err){
      console.log('ERROR: ', err);
    }
  });
};
