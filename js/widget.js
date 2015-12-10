var createBox = require('./widgetHelpers/createBox');
var createInput = require('./widgetHelpers/createInput');
var postFunction = require('./widgetHelpers/postFunction');
var createDeleteBtn = require('./widgetHelpers/createDeleteBtn');
var alsoResizeChildren = require('./widgetHelpers/alsoResizeChildren');
var generateNames = require('./widgetHelpers/generateNamesArr');

// $(function() {
module.exports = function(){
  //make overReact-container droppable
  $('#overReact-container').droppable({
    // greedy: true,
    accept: '.box',
    hoverClass: 'ui-state-hover',
    activeClass: 'active',
    drop: function( e, ui ) {
      //escape out if dropping into same div
      if($(this).attr('id') === ui.draggable.parent()[0].id) return;
      var droppedInto = $(this);
      $(ui.draggable).css({
        top: ui.draggable.offset().top - droppedInto.offset().top,
        left: ui.draggable.offset().left - droppedInto.offset().left,
      });
      //append the div that is being dragged into the div that will be its parent
      ui.draggable.appendTo(droppedInto);
      //re-set all divs resizable to also resize their children
      alsoResizeChildren($('#overReact-container'));
    }
  });
  //component name array to keep track of names and prevent duplication
  var savedTemplate = [];

  //Create submit button and place click handler on the submit button.
  //Click handler will send post to create files.
  // var submitBtn = $('<div></div>').attr('id', 'submitButton').text('Create Files');
  // submitBtn.appendTo('.options-section');
  // $('#submitButton').on('click', function() {
  //   postFunction(id, hash);
  // });

  //create input field on the main overReact-container
  createInput('overReact-container', createComponent);

  //add save and load stuffs
  $('#saveButton').on('click',function(e){
    savedTemplate = generateNames();
  });

  $('#loadButton').on('click',function(e){
    $('.box').remove();
    savedTemplate.objects.forEach(function(item){
      createComponent(item, true);
    });
  });

  //node parameter is the form dom element
  function createComponent(node, fromLoadButton) {
    //get the value of the input field & the name of the parent component
    var componentName = fromLoadButton ? node.name : node.find('input').val();

    //backup validation of componentName
    if((/[^\w]/g).test(componentName)) {
      componentName = componentName.replace(/[^\w]/g, '');
    }

    if(generateNames().names.indexOf(componentName) !== -1 || componentName === "App") {
      node.find('input').val('');
      alert('React does not allow duplicate component names');
    } else {
        //clear out the input field
        if (!fromLoadButton) node.find('input').val('');

        //create a new box
        mixpanel.track('Create Component');
        createBox(componentName, node, fromLoadButton);

        //create Delete Button
        createDeleteBtn(componentName);
      }
  }
};//closes module.exports function
