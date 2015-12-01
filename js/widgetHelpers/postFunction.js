var createDataObj = require('./createDataObj');
var projectName = 'OverReact';
module.exports = function() {
  //interprets the DOM into an object
  var dataObj = {name: 'app', children:[]};
  createDataObj(dataObj, '#container');
  //post request to create React files and download the zip
  $.ajax({
    method: 'POST',
    url: '/submit',
    contentType: 'application/json',
    data: JSON.stringify({
      projectName: 'OverReact',
      main: dataObj
    }),
    //this initiates download once the file is zipped
    success: function(){
      window.location.href = `/download/:${projectName}`;
    },
    error: function(err){
      console.log('ERROR: ', err);
    }
  });
};
