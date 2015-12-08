module.exports = function(node) {
  node.find('div.box').each(function() {
    var children = [];
    $(this).find('div.box').each(function() {
      children.push(`#${$(this).attr('id')}`);
    });
    children = children.join(',');
    $(this).resizable({
      alsoResize: children
    });
  });
};
