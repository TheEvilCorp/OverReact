var createInput = require('./createInput');

module.exports = function(node) {
  createInput(node, renameComponent);
  $('#' + node).find('form').css({
    top: 0,
    left: 0,
    position: 'absolute',
  });
  $('#' + node).find('input').focus();
}

function renameComponent(node) {
  var oldNameNode = $(node).parent().find('span');
  var newName = $(node).find('input').val();
  oldNameNode.text(newName);
  $(node).remove();
}
