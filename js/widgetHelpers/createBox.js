var alsoResizeChildren = require('./alsoResizeChildren');
var generateNames = require('./generateNamesArr');
var replaceNameWithInputField = require('./replaceNameWithInputField');

//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
module.exports = function (boxName, node, fromLoadButton) {
  var context = fromLoadButton ? $('#' + node.parent) : $('#overReact-container');

  //To append parent name to box
  var contextName = context.attr('id')
  if(contextName === 'overReact-container') contextName = 'App'

  //create and append box
  $('<div class="box"><div>').attr('id', boxName)
    .append(`<div id="names"><span>${boxName}</span><p class='parentName'> nested in: ${contextName}</p></div>`)
    .appendTo(context)
    .draggable({
      containment: '#overReact-container',
      cursor: "move",
      start: function(e, ui){
        $(this).zIndex(99)
        $(this).find('p:first-of-type').css('color', '#A3A3A3');
        // $(this).css('z-index', 1000);
        // console.log('Zindex start: ', $(this).css('z-index'))
      }
      // stop: function(e,ui){
      //   $(this).css('z-index', 500)
      //   console.log('Zindex stop: ', $(this).css('z-index'))
      // }
    })
    .resizable({
      containment: 'parent',
    })
    .droppable({
      greedy: true,
      //accept: '*',
      //hoverClass: 'ui-state-hover drop-background-on',
      //activeClass: 'ui-state-hover drop-background-on',
      over: function( event, ui ) {
        console.log('onHover');
      },
      tolerance: 'fit',
      drop: function( e, ui ) {
        var droppedInto = $(this);
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        //if dropping into same div, return out
        if(droppedInto.attr('id') === ui.draggable.parent()[0].id) return;
        //adjust the css on drop
        $(ui.draggable).css({
          top: ui.draggable.offset().top - droppedInto.offset().top,
          left: ui.draggable.offset().left - droppedInto.offset().left
        });
        //change parent name of "nested in: "
        var parentName = droppedInto.attr('id');

        //when we set greedy to false & tried to grab "real parent", the parent name still bubbled out to the grandparent/ great grandparent
        // console.log('REAL PARENT: ', $(ui.draggable).parent('div').attr('id'));
        // var parentName = $(ui.draggable).parent('div').attr('id')

        if(parentName === 'overReact-container') parentName = 'App';
        $(ui.draggable).children('div').children('p').text('nested in: ' + parentName)
        //append the div that is being dragged into the div that will be its parent
        ui.draggable.appendTo(droppedInto);
        //re-set all divs resizable to also resize their children
        alsoResizeChildren($('#overReact-container'));
        return;
      }
    });

  //initial styling

  if (fromLoadButton) {
    $('#' + boxName).attr('style', node.style);
  } else {
      if (generateNames().names.length !== 0) {

        var boxPos = {
          height: 75,
          width: 300,
          top: generateNames().lowestElem.position.top + 30
        };

        if (generateNames().lowestElem.distToBottom < 100) {
          boxPos.top = 30
        }

        $('#' + boxName).css(boxPos);

      } else {
        $('#' + boxName).css({
          height: 75,
          width: 300,
          top: 30
        });
      }
  }
  $('#' + boxName).find('span').on('dblclick', function(e) {
    e.preventDefault();
    replaceNameWithInputField(boxName);
  });
};
