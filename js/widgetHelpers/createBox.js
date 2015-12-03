var alsoResizeChildren = require('./alsoResizeChildren');

//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
module.exports = function (boxName, context, style, lastSibling, left) {
  console.log('style: ' + style)
  console.log('lastSibling: ' + lastSibling)
  console.log('left: ' + left)
  context = $('#' + context);
  var containerTop = $('#container').position().top;

  //create and append box
  $('<div class="box"><div>').attr('id', boxName).text(boxName)
    .appendTo(context)
    .draggable({
      containment: '#container'
    })
    .resizable({
      containment: 'parent',
    })
    .droppable({
      greedy: true,
      accept: '.box',
      hoverClass: 'ui-state-hover',
      tolerance: 'fit',
      drop: function( e, ui ) {
        var droppedInto = $(this);
        //if dropping into same div, return out
        if(droppedInto.attr('id') === ui.draggable.parent()[0].id) return;
        //append the div that is being dragged into the div that will be its parent
        ui.draggable.appendTo(droppedInto);
        //re-set all divs resizable to also resize their children
        alsoResizeChildren($('#container'));
        $(ui.draggable).css({
          top: ui.draggable.offset().top - droppedInto.offset().top,
          left: ui.draggable.offset().left - droppedInto.offset().left,
        });
        return;
      }
    });

    //if the new box is not a direct child of the main container, set its parent resizable to resize all of the children for that parent

  //initial styling

  if (style) {
    $('#' + boxName).attr('style', style);
  } else {

      if (lastSibling) {
        //find the lowest box element
        var allHeights = [];
        
        $('.box').each(function(node) {
          var stats = [];
          var currDist = $('#container').height() - ($(this).height() + $(this).position().top);
          allHeights.push(currDist);
        });

        var distToBottom = Math.min(...allHeights);

        var boxPos = {
          height: 100,
          width: context.width() * 0.75,
          top: $('#' + lastSibling).position().top + 30
        };

        if (distToBottom < 100) {
          boxPos.top = 30
        }

        // if ($('#' + lastSibling).position().left === 30) {
        //   boxPos.top = $('#' + lastSibling).position().top + 30;
        // }

        $('#' + boxName).css(boxPos);

      } else {
        $('#' + boxName).css({
          height: context.height() * 0.30,
          width: context.width() * 0.75,
          top: 0
        });
      }
  }
};
