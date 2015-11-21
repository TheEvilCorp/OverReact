// interprets the DOM to create an object for the post function.
var createDataObj = function (dataObj, elemID){
  var childArray = $(elemID).children('div.box').toArray();
  var childName, childID, newObj;

  childArray.forEach(child => {
    childName = $(child).attr('id');
    childID = '#' + childName;
    newObj = {name: childName, children:[]};
    dataObj.children.push(newObj);
    if($(child).children('div.box').toArray().length > 0) {
      return createDataObj(newObj, childID);
    }
  });
}

module.exports = createDataObj;
