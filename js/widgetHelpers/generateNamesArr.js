// interprets the DOM to create an object for the post function.
module.exports = function () {
  var output = [];

  $('#overReact-container').find('div.box').each(function(e) {
    output.push({
      name: $(this).attr('id'),
      parent: $(this).parent().attr('id'),
      position: $(this).position(),
      height: $(this).height(),
      width: $(this).width()
    });
  });

  return {
    namesArray: output.map(function(e) { return e.name }),
    objects: output
  };
}
