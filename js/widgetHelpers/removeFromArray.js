module.exports = function (componentName, array) {
  //remove top component from array
  var index = array.map(function(e) { return e.name; }).indexOf(componentName);
  array.splice(index,1);
  //remove children components from array
  $('#' + componentName).find('div.box')
  .each(function(e){
    var componentId = $(this).attr('id');
    index = array.map(function(e) { return e.name; }).indexOf(componentId);
    array.splice(index,1);
  });
};
