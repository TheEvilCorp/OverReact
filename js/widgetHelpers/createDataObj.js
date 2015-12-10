// interprets the DOM to create an object for the post function.
var createDataObj = function (dataObj, elemID){
  var childArray = $(elemID).children('div.box').toArray();
  var childName, childID, newObj, position, height, width;

  childArray.forEach(child => {
    childName = $(child).attr('id');
    childID = '#' + childName;
    position = $(child).position();
    height = $(child).height() + '.'.split('.')[0];
    width = $(child).width() + '.'.split('.')[0];

    newObj = {name: childName,
      children:[],
      position: position,
      height: height,
      width: width
    };
    dataObj.children.push(newObj);
    if($(child).children('div.box').toArray().length > 0) {
      return createDataObj(newObj, childID);
    }
  });
};

module.exports = createDataObj;
