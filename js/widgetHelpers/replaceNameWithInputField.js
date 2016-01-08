import CreateInput from './createInput';

//renames the component and removes input field
function renameComponent(node) {
  const $node = $(node);
  mixpanel.track('Renamed Component');
  const oldNameNode = $node.parent().find('span').first();
  const newName = $node.find('input').val();
  oldNameNode.text(newName);
  $node.parent().attr('id', newName);
  $node.remove();

  oldNameNode.on('dblclick', function(e) {
    e.preventDefault();
    replaceNameWithInputField(newName);
  });
}

//creates an input to type new name for the box being renamed and sets focus to that input
export default function replaceNameWithInputField(node){
  CreateInput(node, renameComponent);
  $('#' + node).find('form').css({
    top: 0,
    left: 0,
    position: 'absolute',
  });
  $('#' + node).find('input').focus();

  //if escape is entered, keep the box the same name
  $('#' + node).find('input').on('keyup', function(e){
    e.preventDefault();
    if(e.keyCode === 27) {
      $(e.target).parent().remove();
      //create new span & add back the dblclk listener on the span
      const newSpan = $('<span>' + node + '</span>');
      newSpan.on('dblclick', function(e) {
        e.preventDefault();
        renameComponent(node);
      });
      $(e.target).parent().parent().append(newSpan)
    }
  });
}
