export default function(componentName, array) {
  //remove top component from array
  let index = array.map( elem => elem.name).indexOf(componentName);
  array.splice(index, 1);
  //remove children components from array
  $('#' + componentName).find('div.box')
  .each(elem => {
    const componentId = $(this).attr('id');
    index = array.map( elem => elem.name).indexOf(componentId);
    array.splice(index,1);
  });
};
