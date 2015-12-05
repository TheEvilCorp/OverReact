var createInput = require('./createInput');

//renames the component and removes input field
function renameComponent(node) {
  var oldNameNode = $(node).parent().find('span').first();
  var newName = $(node).find('input').val();
  oldNameNode.text(newName);
  $(node).parent().attr('id', newName);
  $(node).remove();
}

//creates an input for the box being renamed and sets focus to that input
module.exports = function(node) {
  createInput(node, renameComponent);
  $('#' + node).find('form').css({
    top: 0,
    left: 0,
    position: 'absolute',
  });
  $('#' + node).find('input').focus();
};
