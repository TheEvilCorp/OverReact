var createBox = require('./widgetHelpers/createBox');
var createInput = require('./widgetHelpers/createInput');
var postFunction = require('./widgetHelpers/postFunction');
var createDeleteBtn = require('./widgetHelpers/createDeleteBtn');
var alsoResizeChildren = require('./widgetHelpers/alsoResizeChildren');

// $(function() {
module.exports = function(){
  //make overReact-container droppable
  $('#overReact-container').droppable({
    greedy: true,
    accept: '.box',
    hoverClass: 'ui-state-hover',
    activeClass: 'active',
    drop: function( e, ui ) {
      if($(this).attr('id') === ui.draggable.parent()[0].id) return;
      ui.draggable.appendTo($(this));
      alsoResizeChildren($('#overReact-container'));
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

  //create input field on the main overReact-container
  createInput('overReact-container', createComponent);

  //add save and load stuffs
  $('#saveButton').on('click',function(e){
    savedTemplate = [];
    for (var i = 0; i < allNames.length; i++) {
      allNames[i].style = $('#' + allNames[i].name).attr('style');
      savedTemplate.push(allNames[i]);
    }
  });

  $('#loadButton').on('click',function(e){
    $('.box').each(function(i){this.remove()});
    allNames = [];
    for (var i = 0; i < savedTemplate.length; i++) {
      createComponent(null, savedTemplate[i], true);
    }
  });

  //node parameter is the form dom element
  function createComponent(node, obj, fromLoadButton) {
    //get the value of the input field & the name of the parent component
    var componentName, parentName, boxOffset;

    if (fromLoadButton) {
      componentName = obj.name;
      parentName = obj.context;
      obj.offset = undefined;
    } else {
      componentName = node.find('input').val();
      parentName = node.parent().attr('id');
      obj = {style: undefined};
    }

    if(allNames.map(function(e) {return e.name}).indexOf(componentName) !== -1) {
      node.find('input').val('');
      alert('duplicate name');
    } else {

        boxOffset = allNames.map(function(e) {return e.context}).lastIndexOf(parentName);
        if (boxOffset === -1) boxOffset = 0;

        //push the component name to an array in order to keep track of names & prevent dupes
        allNames.push({name: componentName, context: parentName, style: null});
        obj.offset = allNames[boxOffset].name;

        //clear out the input field
        if (!fromLoadButton) node.find('input').val('');

        //create a new box
        createBox(componentName, parentName, obj.style, obj.offset);

        //create Delete Button
        createDeleteBtn(componentName, allNames);
      }
  }
};//closes module.exports function
