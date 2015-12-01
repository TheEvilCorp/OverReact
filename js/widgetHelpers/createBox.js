//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
module.exports = function (boxName, context) {
  context = $('#' + context);
  //create and append box
  $('<div class="box"><div>').attr('id', boxName).text(boxName)
    .appendTo(context)
    .draggable({
      containment: 'parent',
    })
    .resizable({
      containment: 'parent'
    });
  //initial styling
  $('#' + boxName).css({
    height: context.height() * 0.30,
    width: context.width() * 0.75,
    top: context.position().top + 5,
    left: context.position().left + 5,
  });
};
