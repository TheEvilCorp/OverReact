var createBox = require('./widgetHelpers/createBox');
var createInput = require('./widgetHelpers/createInput');
var postFunction = require('./widgetHelpers/postFunction');
var createDeleteBtn = require('./widgetHelpers/createDeleteBtn');

$(function() {
  //component name array to keep track of names and prevent duplication
  var allNames = [];

  //place click handler on the submit button. Click handler will send post to create files.
  $('#submitButton').on('click', postFunction);

  //create input field on the main container
  createInput('container', createComponent);

  //node parameter is the form dom element
  function createComponent(node){
    //get the value of the input field & the name of the parent component
    var componentName = node.find('input').val().toLowerCase();
    var parentName = node.parent().attr('id');

    if(allNames.indexOf(componentName) !== -1) {
      alert('duplicate name');
    } else {
      //push the component name to an array in order to keep track of names & prevent dupes
      allNames.push(componentName);

      //clear out the input field
      node.find('input').val('');

      //create a new box
      createBox(componentName, parentName);

      //create input field
      createInput(componentName, createComponent);

      //create Delete Button
      createDeleteBtn(componentName, allNames);
    }
  }
});//closes anon function
