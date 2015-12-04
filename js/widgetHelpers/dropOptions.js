module.exports = {
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
  }
