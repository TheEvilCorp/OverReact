var createDataObj = require('./createDataObj');

module.exports = function() {
  //interprets the DOM into an object
  var dataObj = {name: 'container', children:[]};
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
      window.location.href = '/download';
    },
    error: function(err){
      console.log('ERROR: ', err);
    }
  });
};
