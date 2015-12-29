// interprets the DOM to create an object for the post function.
export default function createDataObj(dataObj, elemID){
  const childArray = [...$(elemID).children('div.box')];
  let childName, childID, newObj, position, height, width;

  childArray.forEach( child => {

    const $child = $(child);
    childName = $child.attr('id');
    childID = '#' + childName;
    position = $child.position();
    height = $child.height() + '.'.split('.')[0];
    width = $child.width() + '.'.split('.')[0];

    const newObj = {
      name: childName,
      children:[],
      position: position,
      height: height,
      width: width
    };

    dataObj.children.push(newObj);
    if([...$child.children('div.box')].length > 0) {
      return createDataObj(newObj, childID);
    }
  });
};
