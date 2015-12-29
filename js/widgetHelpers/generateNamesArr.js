// interprets the DOM to create an object for the post function.
export default function () {
  const output = [];

  $('#overReact-container').find('div.box').each( function(e) {
    output.push({
      name: $(this).attr('id'),
      parent: $(this).parent().attr('id'),
      position: $(this).position(),
      height: $(this).height(),
      width: $(this).width(),
      distToBottom: $('#overReact-container').height() - ($(this).height() + $(this).position().top),
      style: `height: ${$(this).height()}px;
      width: ${$(this).width()}px;
      top: ${$(this).position().top}px;
      left: ${$(this).position().left}px;`
    });
  });

  return {
    names: output.map( ({name}) => name ),
    objects: output,
    lowestElem: output.sort(function(a,b){
      return a.distToBottom - b.distToBottom;
    })[0]
  };
}
