(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var createBox = require('./widgetHelpers/createBox');
var createInput = require('./widgetHelpers/createInput');
var postFunction = require('./widgetHelpers/postFunction');
var createDeleteBtn = require('./widgetHelpers/createDeleteBtn');

$(function () {
  //component name array to keep track of names and prevent duplication
  var allNames = [];

  //place click handler on the submit button. Click handler will send post to create files.
  $('#submitButton').on('click', postFunction);

  //create input field on the main container
  createInput('container', createComponent);

  //node parameter is the form dom element
  function createComponent(node) {
    //get the value of the input field & the name of the parent component
    var componentName = node.find('input').val().toLowerCase();
    var parentName = node.parent().attr('id');

    if (allNames.indexOf(componentName) !== -1) {
      alert('duplicate name');
    } else {
      //push the component name to an array in order to keep track of names & prevent dupes
      allNames.push(componentName);

      //clear out the input field
      node.find('input').val('');

      //create a new box
      createBox(componentName, parentName);

      //create input field
      createInput(componentName, createComponent);

      //create Delete Button
      createDeleteBtn(componentName, allNames);
    }
  }
}); //closes anon function

},{"./widgetHelpers/createBox":2,"./widgetHelpers/createDeleteBtn":4,"./widgetHelpers/createInput":5,"./widgetHelpers/postFunction":6}],2:[function(require,module,exports){
'use strict';

//creates a new box div and appends it to the parent node (context). Sets the box to be resizable and draggable. Applies default CSS for dynamic resizing of boxes inside child boxes.
module.exports = function (boxName, context) {
  context = $('#' + context);
  //create and append box
  $('<div class="box"><div>').attr('id', boxName).text(boxName).appendTo(context).draggable({
    containment: 'parent'
  }).resizable({
    containment: 'parent'
  });
  //initial styling
  $('#' + boxName).css({
    height: context.height() * 0.30,
    width: context.width() * 0.75,
    top: context.position().top + 5,
    left: context.position().left + 5
  });
};

},{}],3:[function(require,module,exports){
'use strict';

// interprets the DOM to create an object for the post function.
var createDataObj = function createDataObj(dataObj, elemID) {
  var childArray = $(elemID).children('div.box').toArray();
  var childName, childID, newObj;

  childArray.forEach(function (child) {
    childName = $(child).attr('id');
    childID = '#' + childName;
    newObj = { name: childName, children: [] };
    dataObj.children.push(newObj);
    if ($(child).children('div.box').toArray().length > 0) {
      return createDataObj(newObj, childID);
    }
  });
};

module.exports = createDataObj;

},{}],4:[function(require,module,exports){
'use strict';

//function called to create a delete button for new boxes
var createDeleteBtn = function createDeleteBtn(parent, array) {
  var deleteBtn = $('<button>X</button>');
  deleteBtn.addClass('deleteBtn');
  deleteBtn.on('click', function (e) {
    e.preventDefault();
    deleteComponent(e.target, array);
  });
  deleteBtn.appendTo('#' + parent);
};

//delete button click handler to allow for deleted component name to be reused
function deleteComponent(button, array) {
  var parentName = button.parentNode.id;
  button.parentNode.remove();
  var index = array.indexOf(parentName);
  array.splice(index, 1);
}

module.exports = createDeleteBtn;

},{}],5:[function(require,module,exports){
'use strict';

//function called to create an input field in new boxes
module.exports = function (context, func) {
  var inputField = $('<form><input required placeholder="component name..."></input></form>');
  inputField.appendTo('#' + context);
  inputField.on('submit', function (e) {
    e.preventDefault();
    func($(this));
  });
};

},{}],6:[function(require,module,exports){
'use strict';

var createDataObj = require('./createDataObj');
var projectName = 'OverReact';
module.exports = function () {
  //interprets the DOM into an object
  var dataObj = { name: 'app', children: [] };
  createDataObj(dataObj, '#container');
  //post request to create React files and download the zip
  $.ajax({
    method: 'POST',
    url: '/submit',
    contentType: 'application/json',
    data: JSON.stringify({
      projectName: 'OverReact',
      main: dataObj
    }),
    //this initiates download once the file is zipped
    success: function success() {
      window.location.href = '/download/:' + projectName;
    },
    error: function error(err) {
      console.log('ERROR: ', err);
    }
  });
};

},{"./createDataObj":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy93aWRnZXQuanMiLCJqcy93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveC5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGF0YU9iai5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGVsZXRlQnRuLmpzIiwianMvd2lkZ2V0SGVscGVycy9jcmVhdGVJbnB1dC5qcyIsImpzL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFakUsQ0FBQyxDQUFDLFlBQVc7O0FBRVgsTUFBSSxRQUFRLEdBQUcsRUFBRTs7O0FBQUMsQUFHbEIsR0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOzs7QUFBQyxBQUc3QyxhQUFXLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQzs7O0FBQUMsQUFHMUMsV0FBUyxlQUFlLENBQUMsSUFBSSxFQUFDOztBQUU1QixRQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNELFFBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLFFBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN6QyxXQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUN6QixNQUFNOztBQUVMLGNBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7QUFBQyxBQUc3QixVQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7OztBQUFDLEFBRzNCLGVBQVMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDOzs7QUFBQyxBQUdyQyxpQkFBVyxDQUFDLGFBQWEsRUFBRSxlQUFlLENBQUM7OztBQUFDLEFBRzVDLHFCQUFlLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzFDO0dBQ0Y7Q0FDRixDQUFDO0FBQUM7Ozs7O0FDdkNILE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQzNDLFNBQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQzs7QUFBQyxBQUUzQixHQUFDLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDMUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUNqQixTQUFTLENBQUM7QUFDVCxlQUFXLEVBQUUsUUFBUTtHQUN0QixDQUFDLENBQ0QsU0FBUyxDQUFDO0FBQ1QsZUFBVyxFQUFFLFFBQVE7R0FDdEIsQ0FBQzs7QUFBQyxBQUVMLEdBQUMsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ25CLFVBQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSTtBQUMvQixTQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUk7QUFDN0IsT0FBRyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMvQixRQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksR0FBRyxDQUFDO0dBQ2xDLENBQUMsQ0FBQztDQUNKLENBQUM7Ozs7OztBQ2xCRixJQUFJLGFBQWEsR0FBRyxTQUFoQixhQUFhLENBQWEsT0FBTyxFQUFFLE1BQU0sRUFBQztBQUM1QyxNQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3pELE1BQUksU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUM7O0FBRS9CLFlBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLEVBQUk7QUFDMUIsYUFBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsV0FBTyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDMUIsVUFBTSxHQUFHLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUM7QUFDeEMsV0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUIsUUFBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDcEQsYUFBTyxhQUFhLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDO0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQzs7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQzs7Ozs7O0FDZi9CLElBQUksZUFBZSxHQUFHLFNBQWxCLGVBQWUsQ0FBWSxNQUFNLEVBQUUsS0FBSyxFQUFDO0FBQzNDLE1BQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ3hDLFdBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDaEMsV0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDaEMsS0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLG1CQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztHQUNsQyxDQUFDLENBQUM7QUFDSCxXQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQztDQUNsQzs7O0FBQUMsQUFHRixTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO0FBQ3JDLE1BQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO0FBQ3RDLFFBQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsTUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN0QyxPQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQztDQUN2Qjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQzs7Ozs7O0FDbEJqQyxNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUN2QyxNQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsdUVBQXVFLENBQUMsQ0FBQztBQUM1RixZQUFVLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQztBQUNuQyxZQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFTLENBQUMsRUFBQztBQUNqQyxLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsUUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0dBQ2YsQ0FBQyxDQUFDO0NBQ0osQ0FBQzs7Ozs7QUNSRixJQUFJLGFBQWEsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFXOztBQUUxQixNQUFJLE9BQU8sR0FBRyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDO0FBQ3pDLGVBQWEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOztBQUFDLEFBRXJDLEdBQUMsQ0FBQyxJQUFJLENBQUM7QUFDTCxVQUFNLEVBQUUsTUFBTTtBQUNkLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLGtCQUFrQjtBQUMvQixRQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNuQixpQkFBVyxFQUFFLFdBQVc7QUFDeEIsVUFBSSxFQUFFLE9BQU87S0FDZCxDQUFDOztBQUVGLFdBQU8sRUFBRSxtQkFBVTtBQUNqQixZQUFNLENBQUMsUUFBUSxDQUFDLElBQUksbUJBQWlCLFdBQVcsQUFBRSxDQUFDO0tBQ3BEO0FBQ0QsU0FBSyxFQUFFLGVBQVMsR0FBRyxFQUFDO0FBQ2xCLGFBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzdCO0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY3JlYXRlQm94ID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveCcpO1xudmFyIGNyZWF0ZUlucHV0ID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZUlucHV0Jyk7XG52YXIgcG9zdEZ1bmN0aW9uID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL3Bvc3RGdW5jdGlvbicpO1xudmFyIGNyZWF0ZURlbGV0ZUJ0biA9IHJlcXVpcmUoJy4vd2lkZ2V0SGVscGVycy9jcmVhdGVEZWxldGVCdG4nKTtcblxuJChmdW5jdGlvbigpIHtcbiAgLy9jb21wb25lbnQgbmFtZSBhcnJheSB0byBrZWVwIHRyYWNrIG9mIG5hbWVzIGFuZCBwcmV2ZW50IGR1cGxpY2F0aW9uXG4gIHZhciBhbGxOYW1lcyA9IFtdO1xuXG4gIC8vcGxhY2UgY2xpY2sgaGFuZGxlciBvbiB0aGUgc3VibWl0IGJ1dHRvbi4gQ2xpY2sgaGFuZGxlciB3aWxsIHNlbmQgcG9zdCB0byBjcmVhdGUgZmlsZXMuXG4gICQoJyNzdWJtaXRCdXR0b24nKS5vbignY2xpY2snLCBwb3N0RnVuY3Rpb24pO1xuXG4gIC8vY3JlYXRlIGlucHV0IGZpZWxkIG9uIHRoZSBtYWluIGNvbnRhaW5lclxuICBjcmVhdGVJbnB1dCgnY29udGFpbmVyJywgY3JlYXRlQ29tcG9uZW50KTtcblxuICAvL25vZGUgcGFyYW1ldGVyIGlzIHRoZSBmb3JtIGRvbSBlbGVtZW50XG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChub2RlKXtcbiAgICAvL2dldCB0aGUgdmFsdWUgb2YgdGhlIGlucHV0IGZpZWxkICYgdGhlIG5hbWUgb2YgdGhlIHBhcmVudCBjb21wb25lbnRcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IG5vZGUuZmluZCgnaW5wdXQnKS52YWwoKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBwYXJlbnROYW1lID0gbm9kZS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xuXG4gICAgaWYoYWxsTmFtZXMuaW5kZXhPZihjb21wb25lbnROYW1lKSAhPT0gLTEpIHtcbiAgICAgIGFsZXJ0KCdkdXBsaWNhdGUgbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3B1c2ggdGhlIGNvbXBvbmVudCBuYW1lIHRvIGFuIGFycmF5IGluIG9yZGVyIHRvIGtlZXAgdHJhY2sgb2YgbmFtZXMgJiBwcmV2ZW50IGR1cGVzXG4gICAgICBhbGxOYW1lcy5wdXNoKGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAvL2NsZWFyIG91dCB0aGUgaW5wdXQgZmllbGRcbiAgICAgIG5vZGUuZmluZCgnaW5wdXQnKS52YWwoJycpO1xuXG4gICAgICAvL2NyZWF0ZSBhIG5ldyBib3hcbiAgICAgIGNyZWF0ZUJveChjb21wb25lbnROYW1lLCBwYXJlbnROYW1lKTtcblxuICAgICAgLy9jcmVhdGUgaW5wdXQgZmllbGRcbiAgICAgIGNyZWF0ZUlucHV0KGNvbXBvbmVudE5hbWUsIGNyZWF0ZUNvbXBvbmVudCk7XG5cbiAgICAgIC8vY3JlYXRlIERlbGV0ZSBCdXR0b25cbiAgICAgIGNyZWF0ZURlbGV0ZUJ0bihjb21wb25lbnROYW1lLCBhbGxOYW1lcyk7XG4gICAgfVxuICB9XG59KTsvL2Nsb3NlcyBhbm9uIGZ1bmN0aW9uXG4iLCIvL2NyZWF0ZXMgYSBuZXcgYm94IGRpdiBhbmQgYXBwZW5kcyBpdCB0byB0aGUgcGFyZW50IG5vZGUgKGNvbnRleHQpLiBTZXRzIHRoZSBib3ggdG8gYmUgcmVzaXphYmxlIGFuZCBkcmFnZ2FibGUuIEFwcGxpZXMgZGVmYXVsdCBDU1MgZm9yIGR5bmFtaWMgcmVzaXppbmcgb2YgYm94ZXMgaW5zaWRlIGNoaWxkIGJveGVzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYm94TmFtZSwgY29udGV4dCkge1xuICBjb250ZXh0ID0gJCgnIycgKyBjb250ZXh0KTtcbiAgLy9jcmVhdGUgYW5kIGFwcGVuZCBib3hcbiAgJCgnPGRpdiBjbGFzcz1cImJveFwiPjxkaXY+JykuYXR0cignaWQnLCBib3hOYW1lKS50ZXh0KGJveE5hbWUpXG4gICAgLmFwcGVuZFRvKGNvbnRleHQpXG4gICAgLmRyYWdnYWJsZSh7XG4gICAgICBjb250YWlubWVudDogJ3BhcmVudCcsXG4gICAgfSlcbiAgICAucmVzaXphYmxlKHtcbiAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50J1xuICAgIH0pO1xuICAvL2luaXRpYWwgc3R5bGluZ1xuICAkKCcjJyArIGJveE5hbWUpLmNzcyh7XG4gICAgaGVpZ2h0OiBjb250ZXh0LmhlaWdodCgpICogMC4zMCxcbiAgICB3aWR0aDogY29udGV4dC53aWR0aCgpICogMC43NSxcbiAgICB0b3A6IGNvbnRleHQucG9zaXRpb24oKS50b3AgKyA1LFxuICAgIGxlZnQ6IGNvbnRleHQucG9zaXRpb24oKS5sZWZ0ICsgNSxcbiAgfSk7XG59O1xuIiwiLy8gaW50ZXJwcmV0cyB0aGUgRE9NIHRvIGNyZWF0ZSBhbiBvYmplY3QgZm9yIHRoZSBwb3N0IGZ1bmN0aW9uLlxudmFyIGNyZWF0ZURhdGFPYmogPSBmdW5jdGlvbiAoZGF0YU9iaiwgZWxlbUlEKXtcbiAgdmFyIGNoaWxkQXJyYXkgPSAkKGVsZW1JRCkuY2hpbGRyZW4oJ2Rpdi5ib3gnKS50b0FycmF5KCk7XG4gIHZhciBjaGlsZE5hbWUsIGNoaWxkSUQsIG5ld09iajtcblxuICBjaGlsZEFycmF5LmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGNoaWxkTmFtZSA9ICQoY2hpbGQpLmF0dHIoJ2lkJyk7XG4gICAgY2hpbGRJRCA9ICcjJyArIGNoaWxkTmFtZTtcbiAgICBuZXdPYmogPSB7bmFtZTogY2hpbGROYW1lLCBjaGlsZHJlbjpbXX07XG4gICAgZGF0YU9iai5jaGlsZHJlbi5wdXNoKG5ld09iaik7XG4gICAgaWYoJChjaGlsZCkuY2hpbGRyZW4oJ2Rpdi5ib3gnKS50b0FycmF5KCkubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZURhdGFPYmoobmV3T2JqLCBjaGlsZElEKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEYXRhT2JqO1xuIiwiLy9mdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIGEgZGVsZXRlIGJ1dHRvbiBmb3IgbmV3IGJveGVzXG52YXIgY3JlYXRlRGVsZXRlQnRuID0gZnVuY3Rpb24ocGFyZW50LCBhcnJheSl7XG4gIHZhciBkZWxldGVCdG4gPSAkKCc8YnV0dG9uPlg8L2J1dHRvbj4nKTtcbiAgZGVsZXRlQnRuLmFkZENsYXNzKCdkZWxldGVCdG4nKTtcbiAgZGVsZXRlQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZGVsZXRlQ29tcG9uZW50KGUudGFyZ2V0LCBhcnJheSk7XG4gIH0pO1xuICBkZWxldGVCdG4uYXBwZW5kVG8oJyMnICsgcGFyZW50KTtcbn07XG5cbi8vZGVsZXRlIGJ1dHRvbiBjbGljayBoYW5kbGVyIHRvIGFsbG93IGZvciBkZWxldGVkIGNvbXBvbmVudCBuYW1lIHRvIGJlIHJldXNlZFxuZnVuY3Rpb24gZGVsZXRlQ29tcG9uZW50KGJ1dHRvbiwgYXJyYXkpe1xuICB2YXIgcGFyZW50TmFtZSA9IGJ1dHRvbi5wYXJlbnROb2RlLmlkO1xuICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZihwYXJlbnROYW1lKTtcbiAgYXJyYXkuc3BsaWNlKGluZGV4LDEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlbGV0ZUJ0bjtcbiIsIi8vZnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSBhbiBpbnB1dCBmaWVsZCBpbiBuZXcgYm94ZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCwgZnVuYykge1xuICB2YXIgaW5wdXRGaWVsZCA9ICQoJzxmb3JtPjxpbnB1dCByZXF1aXJlZCBwbGFjZWhvbGRlcj1cImNvbXBvbmVudCBuYW1lLi4uXCI+PC9pbnB1dD48L2Zvcm0+Jyk7XG4gIGlucHV0RmllbGQuYXBwZW5kVG8oJyMnICsgY29udGV4dCk7XG4gIGlucHV0RmllbGQub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmdW5jKCQodGhpcykpO1xuICB9KTtcbn07XG4iLCJ2YXIgY3JlYXRlRGF0YU9iaiA9IHJlcXVpcmUoJy4vY3JlYXRlRGF0YU9iaicpO1xudmFyIHByb2plY3ROYW1lID0gJ092ZXJSZWFjdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAvL2ludGVycHJldHMgdGhlIERPTSBpbnRvIGFuIG9iamVjdFxuICB2YXIgZGF0YU9iaiA9IHtuYW1lOiAnYXBwJywgY2hpbGRyZW46W119O1xuICBjcmVhdGVEYXRhT2JqKGRhdGFPYmosICcjY29udGFpbmVyJyk7XG4gIC8vcG9zdCByZXF1ZXN0IHRvIGNyZWF0ZSBSZWFjdCBmaWxlcyBhbmQgZG93bmxvYWQgdGhlIHppcFxuICAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy9zdWJtaXQnLFxuICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgcHJvamVjdE5hbWU6ICdPdmVyUmVhY3QnLFxuICAgICAgbWFpbjogZGF0YU9ialxuICAgIH0pLFxuICAgIC8vdGhpcyBpbml0aWF0ZXMgZG93bmxvYWQgb25jZSB0aGUgZmlsZSBpcyB6aXBwZWRcbiAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2Rvd25sb2FkLzoke3Byb2plY3ROYW1lfWA7XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcbiAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogJywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
