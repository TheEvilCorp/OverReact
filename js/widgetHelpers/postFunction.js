var createDataObj = require('./createDataObj');
var projectName = 'OverReact';
module.exports = function(id, hash) {
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
      projectName: 'OverReact',
      main: dataObj,
      server: 'hapi',
      task: 'gulp',
      id: id,
      hash: hash
    }),
    //this initiates download once the file is zipped
    success: function(){
      window.location.href = `/download/:${hash}`;
    },
    error: function(err){
      console.log('ERROR: ', err);
    }
  });
};
