var alsoResizeChildren = require('./alsoResizeChildren');

//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
module.exports = function (boxName, context, style, lastSibling, left) {
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
      activeClass: 'active',
      drop: function( e, ui ) {
        //if dropping into same div, return out
        if($(this).attr('id') === ui.draggable.parent()[0].id) return;
        //append the div that is being dragged into the div that will be its parent
        ui.draggable.appendTo($(this));
        //re-set all divs resizable to also resize their children
        alsoResizeChildren($('#container'));
        return;
      }
    });

    //if the new box is not a direct child of the main container, set its parent resizable to resize all of the children for that parent

  //initial styling
  if (style) {
    $('#' + boxName).attr('style', style);
  } else {
      if (lastSibling) {
        $('#' + boxName).css({
          height: 30,
          width: context.width() * 0.75,
          top: $(context).position().top - 981 + 5
        });
      } else {
        $('#' + boxName).css({
          height: context.height() * 0.30,
          width: context.width() * 0.75,
          top: $(context).position().top - 981 + 5
        });
      }
  }
};
