import AlsoResizeChildren from './alsoResizeChildren';
import GenerateNames from './generateNamesArr';
import ReplaceNameWithInputField from './replaceNameWithInputField';

//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
export default function (boxName, node, fromLoadButton) {
  const context = fromLoadButton ? $('#' + node.parent) : $('#overReact-container');

  //To append parent name to box`
  let contextName = context.attr('id')
  if(contextName === 'overReact-container') contextName = 'App'

  //create and append box
  $('<div class="box"><div>').attr('id', boxName)
    .append(`<div class='names'><span>${boxName}</span><p class='parentName'> nested in: ${contextName}</p></div>`)
    .appendTo(context)
    .draggable({
      containment: '#overReact-container',
      cursor: "move",
      start: function(e, ui){
        $(this).find('p:first-of-type').css('color', '#A3A3A3');
        mixpanel.track('Clicked and Dragged Component');
      }
    })
    .resizable({
      containment: 'parent',
    })
    .droppable({
      greedy: true,
      tolerance: 'fit',
      drop: function( e, ui ) {
        const droppedInto = $(this);
        //if dropping into same div, return out
        if(droppedInto.attr('id') === ui.draggable.parent()[0].id) {
          mixpanel.track('Moved Component');
          return;
        }
        //adjust the css on drop
        $(ui.draggable).css({
          top: ui.draggable.offset().top - droppedInto.offset().top,
          left: ui.draggable.offset().left - droppedInto.offset().left
        });
        //append the div that is being dragged into the div that will be its parent
        ui.draggable.appendTo(droppedInto);
        //re-set all divs resizable to also resize their children
        AlsoResizeChildren($('#overReact-container'));
        //change parent name of "nested in: "
        let parentName = droppedInto.attr('id');
        if(parentName === 'overReact-container') parentName = 'App';
        $(ui.draggable).children('div').children('p').text('nested in: ' + parentName)
        mixpanel.track('Nested Component');
        return;
      }
    });

  //initial styling

  if (fromLoadButton) {
    $('#' + boxName).attr('style', node.style);
  } else {
      if (GenerateNames().names.length !== 0) {

        let boxPos = {
          height: 75,
          width: 300,
          top: GenerateNames().lowestElem.position.top + 30
        };

        if (GenerateNames().lowestElem.distToBottom < 100) {
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
    ReplaceNameWithInputField(boxName);
  });
};
