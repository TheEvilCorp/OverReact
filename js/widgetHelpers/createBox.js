//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
module.exports = function (boxName, context, style) {
  context = $('#' + context);
  //create and append box
  $('<div class="box"><div>').attr('id', boxName).text(boxName)
    .appendTo(context)
    .draggable()
    .resizable({
      containment: 'parent'
    })
    .droppable({
      greedy: true,
      accept: '.box',
      hoverClass: 'ui-state-hover',
      activeClass: 'active',
      drop: function( event, ui ) {
        console.log(ui, 'hey');
        // console.log($(this));

        ui.draggable.appendTo($(this));
        return;
      }
    });

    //if the new box is not a direct child of the main container, set its parent resizable to resize all of the children for that parent
    // if(context[0].id !== 'container') {
    //   var resizeChildren = [];
    //   context.find('.box').each(function(){
    //     resizeChildren.push('#'+$(this).attr('id'));
    //   });
    //   resizeChildren = resizeChildren.join(',');
    //   $('#' + context[0].id).resizable({
    //     alsoResize: resizeChildren
    //   });
    // }
  //initial styling
  if (style) {
    $('#' + boxName).attr('style', style);
  } else {
    $('#' + boxName).css({
      height: context.height() * 0.30,
      width: context.width() * 0.75,
      // top: context.position().top + 5,
      // left: context.position().left + 5,
    });
  }
};
