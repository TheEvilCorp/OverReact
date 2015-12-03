var createBox = require('./widgetHelpers/createBox');
var createInput = require('./widgetHelpers/createInput');
var postFunction = require('./widgetHelpers/postFunction');
var createDeleteBtn = require('./widgetHelpers/createDeleteBtn');
var alsoResizeChildren = require('./widgetHelpers/alsoResizeChildren');

// $(function() {
module.exports = function(){
  //make container droppable
  $('#container').droppable({
    greedy: true,
    accept: '.box',
    hoverClass: 'ui-state-hover',
    activeClass: 'active',
    drop: function( e, ui ) {
      if($(this).attr('id') === ui.draggable.parent()[0].id) return;
      ui.draggable.appendTo($(this));
      alsoResizeChildren($('#container'));
      $(ui.draggable).css({
        top: ui.draggable.offset().top - $(this).offset().top,
        left: ui.draggable.offset().left - $(this).offset().left,
      });
      return;
    }
  });
  //component name array to keep track of names and prevent duplication
  var allNames = [];
  var savedTemplate = [];

  //Create submit button and place click handler on the submit button.
  //Click handler will send post to create files.
  var submitBtn = $('<div></div>').attr('id', 'submitButton').text('Create Files');
  submitBtn.appendTo('.options-section')
  $('#submitButton').on('click', postFunction);

  //create input field on the main container
  createInput('container', createComponent);

  //add save and load stuffs
  $('#saveButton').on('click',function(e){
    savedTemplate = [];
    for (var i = 0; i < allNames.length; i++) {
      allNames[i].style = $('#' + allNames[i].name).attr('style');
      savedTemplate.push(allNames[i]);
    }
    console.log(allNames);
  });


  $('#loadButton').on('click',function(e){
    $('.box').each(function(i){this.remove()});
    allNames = [];
    for (var i = 0; i < savedTemplate.length; i++) {
      console.log('cloning...');
      createComponent(null, savedTemplate[i]);
    }

  });

  //node parameter is the form dom element
  function createComponent(node, obj){
    //get the value of the input field & the name of the parent component
    var componentName;
    var parentName;
    var boxOffset;

    if (obj) {
      componentName = obj.name;
      parentName = obj.context;
    } else {
      componentName = node.find('input').val().toLowerCase();
      parentName = node.parent().attr('id');
    }

    if(allNames.map(function(e) {return e.name}).indexOf(componentName) !== -1) {
      alert('duplicate name');
    } else {
      //push the component name to an array in order to keep track of names & prevent dupes
      boxOffset = allNames.map(function(e) {return e.context}).lastIndexOf(parentName);
      if (boxOffset === -1) {
        boxOffset = 0;
      }
      allNames.push({name: componentName, context: parentName, style: null});

      //clear out the input field
      if (!obj) node.find('input').val('');

      //create a new box
      if (obj) {
        createBox(componentName, parentName, obj.style);
      } else {
          createBox(componentName, parentName, undefined, allNames[boxOffset].name);
      }

      //create Delete Button
      createDeleteBtn(componentName, allNames);
    }
  }
};//closes module.exports function
