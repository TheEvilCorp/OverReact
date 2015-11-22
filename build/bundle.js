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
    var componentName = node.find('input').val();
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
    containment: '#' + context[0].id
  }).resizable({
    containment: '#' + context[0].id
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

var allNames = require('./../widget');
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

},{"./../widget":1}],5:[function(require,module,exports){
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

module.exports = function () {
  //interprets the DOM into an object
  var dataObj = { name: 'container', children: [] };
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
      window.location.href = '/download';
    },
    error: function error(err) {
      console.log('ERROR: ', err);
    }
  });
};

},{"./createDataObj":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy93aWRnZXQuanMiLCJqcy93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveC5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGF0YU9iai5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGVsZXRlQnRuLmpzIiwianMvd2lkZ2V0SGVscGVycy9jcmVhdGVJbnB1dC5qcyIsImpzL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFakUsQ0FBQyxDQUFDLFlBQVc7O0FBRVgsTUFBSSxRQUFRLEdBQUcsRUFBRTs7O0FBQUMsQUFHbEIsR0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOzs7QUFBQyxBQUc3QyxhQUFXLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQzs7O0FBQUMsQUFHMUMsV0FBUyxlQUFlLENBQUMsSUFBSSxFQUFDOztBQUU1QixRQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdDLFFBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLFFBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFB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TUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFXOztBQUUxQixNQUFJLE9BQU8sR0FBRyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDO0FBQy9DLGVBQWEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOztBQUFDLEFBRXJDLEdBQUMsQ0FBQyxJQUFJLENBQUM7QUFDTCxVQUFNLEVBQUUsTUFBTTtBQUNkLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLGtCQUFrQjtBQUMvQixRQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNuQixpQkFBVyxFQUFFLFdBQVc7QUFDeEIsVUFBSSxFQUFFLE9BQU87S0FDZCxDQUFDOztBQUVGLFdBQU8sRUFBRSxtQkFBVTtBQUNqQixZQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7S0FDcEM7QUFDRCxTQUFLLEVBQUUsZUFBUyxHQUFHLEVBQUM7QUFDbEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjcmVhdGVCb3ggPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvY3JlYXRlQm94Jyk7XG52YXIgY3JlYXRlSW5wdXQgPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvY3JlYXRlSW5wdXQnKTtcbnZhciBwb3N0RnVuY3Rpb24gPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uJyk7XG52YXIgY3JlYXRlRGVsZXRlQnRuID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZURlbGV0ZUJ0bicpO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAvL2NvbXBvbmVudCBuYW1lIGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgbmFtZXMgYW5kIHByZXZlbnQgZHVwbGljYXRpb25cbiAgdmFyIGFsbE5hbWVzID0gW107XG5cbiAgLy9wbGFjZSBjbGljayBoYW5kbGVyIG9uIHRoZSBzdWJtaXQgYnV0dG9uLiBDbGljayBoYW5kbGVyIHdpbGwgc2VuZCBwb3N0IHRvIGNyZWF0ZSBmaWxlcy5cbiAgJCgnI3N1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsIHBvc3RGdW5jdGlvbik7XG5cbiAgLy9jcmVhdGUgaW5wdXQgZmllbGQgb24gdGhlIG1haW4gY29udGFpbmVyXG4gIGNyZWF0ZUlucHV0KCdjb250YWluZXInLCBjcmVhdGVDb21wb25lbnQpO1xuXG4gIC8vbm9kZSBwYXJhbWV0ZXIgaXMgdGhlIGZvcm0gZG9tIGVsZW1lbnRcbiAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KG5vZGUpe1xuICAgIC8vZ2V0IHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgZmllbGQgJiB0aGUgbmFtZSBvZiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgIHZhciBjb21wb25lbnROYW1lID0gbm9kZS5maW5kKCdpbnB1dCcpLnZhbCgpO1xuICAgIHZhciBwYXJlbnROYW1lID0gbm9kZS5wYXJlbnQoKS5hdHRyKCdpZCcpO1xuXG4gICAgaWYoYWxsTmFtZXMuaW5kZXhPZihjb21wb25lbnROYW1lKSAhPT0gLTEpIHtcbiAgICAgIGFsZXJ0KCdkdXBsaWNhdGUgbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3B1c2ggdGhlIGNvbXBvbmVudCBuYW1lIHRvIGFuIGFycmF5IGluIG9yZGVyIHRvIGtlZXAgdHJhY2sgb2YgbmFtZXMgJiBwcmV2ZW50IGR1cGVzXG4gICAgICBhbGxOYW1lcy5wdXNoKGNvbXBvbmVudE5hbWUpO1xuXG4gICAgICAvL2NsZWFyIG91dCB0aGUgaW5wdXQgZmllbGRcbiAgICAgIG5vZGUuZmluZCgnaW5wdXQnKS52YWwoJycpO1xuXG4gICAgICAvL2NyZWF0ZSBhIG5ldyBib3hcbiAgICAgIGNyZWF0ZUJveChjb21wb25lbnROYW1lLCBwYXJlbnROYW1lKTtcblxuICAgICAgLy9jcmVhdGUgaW5wdXQgZmllbGRcbiAgICAgIGNyZWF0ZUlucHV0KGNvbXBvbmVudE5hbWUsIGNyZWF0ZUNvbXBvbmVudCk7XG5cbiAgICAgIC8vY3JlYXRlIERlbGV0ZSBCdXR0b25cbiAgICAgIGNyZWF0ZURlbGV0ZUJ0bihjb21wb25lbnROYW1lLCBhbGxOYW1lcyk7XG4gICAgfVxuICB9XG59KTsvL2Nsb3NlcyBhbm9uIGZ1bmN0aW9uXG4iLCIvL2NyZWF0ZXMgYSBuZXcgYm94IGRpdiBhbmQgYXBwZW5kcyBpdCB0byB0aGUgcGFyZW50IG5vZGUgKGNvbnRleHQpLiBTZXRzIHRoZSBib3ggdG8gYmUgcmVzaXphYmxlIGFuZCBkcmFnZ2FibGUuIEFwcGxpZXMgZGVmYXVsdCBDU1MgZm9yIGR5bmFtaWMgcmVzaXppbmcgb2YgYm94ZXMgaW5zaWRlIGNoaWxkIGJveGVzLlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYm94TmFtZSwgY29udGV4dCkge1xuICBjb250ZXh0ID0gJCgnIycgKyBjb250ZXh0KTtcbiAgLy9jcmVhdGUgYW5kIGFwcGVuZCBib3hcbiAgJCgnPGRpdiBjbGFzcz1cImJveFwiPjxkaXY+JykuYXR0cignaWQnLCBib3hOYW1lKS50ZXh0KGJveE5hbWUpXG4gICAgLmFwcGVuZFRvKGNvbnRleHQpXG4gICAgLmRyYWdnYWJsZSh7XG4gICAgICBjb250YWlubWVudDogJyMnICsgY29udGV4dFswXS5pZCxcbiAgICB9KVxuICAgIC5yZXNpemFibGUoe1xuICAgICAgY29udGFpbm1lbnQ6ICcjJyArIGNvbnRleHRbMF0uaWRcbiAgICB9KTtcbiAgLy9pbml0aWFsIHN0eWxpbmdcbiAgJCgnIycgKyBib3hOYW1lKS5jc3Moe1xuICAgIGhlaWdodDogY29udGV4dC5oZWlnaHQoKSAqIDAuMzAsXG4gICAgd2lkdGg6IGNvbnRleHQud2lkdGgoKSAqIDAuNzUsXG4gICAgdG9wOiBjb250ZXh0LnBvc2l0aW9uKCkudG9wICsgNSxcbiAgICBsZWZ0OiBjb250ZXh0LnBvc2l0aW9uKCkubGVmdCArIDUsXG4gIH0pO1xufTtcbiIsIi8vIGludGVycHJldHMgdGhlIERPTSB0byBjcmVhdGUgYW4gb2JqZWN0IGZvciB0aGUgcG9zdCBmdW5jdGlvbi5cbnZhciBjcmVhdGVEYXRhT2JqID0gZnVuY3Rpb24gKGRhdGFPYmosIGVsZW1JRCl7XG4gIHZhciBjaGlsZEFycmF5ID0gJChlbGVtSUQpLmNoaWxkcmVuKCdkaXYuYm94JykudG9BcnJheSgpO1xuICB2YXIgY2hpbGROYW1lLCBjaGlsZElELCBuZXdPYmo7XG5cbiAgY2hpbGRBcnJheS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICBjaGlsZE5hbWUgPSAkKGNoaWxkKS5hdHRyKCdpZCcpO1xuICAgIGNoaWxkSUQgPSAnIycgKyBjaGlsZE5hbWU7XG4gICAgbmV3T2JqID0ge25hbWU6IGNoaWxkTmFtZSwgY2hpbGRyZW46W119O1xuICAgIGRhdGFPYmouY2hpbGRyZW4ucHVzaChuZXdPYmopO1xuICAgIGlmKCQoY2hpbGQpLmNoaWxkcmVuKCdkaXYuYm94JykudG9BcnJheSgpLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjcmVhdGVEYXRhT2JqKG5ld09iaiwgY2hpbGRJRCk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEYXRhT2JqO1xuIiwidmFyIGFsbE5hbWVzID0gcmVxdWlyZSgnLi8uLi93aWRnZXQnKTtcbi8vZnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSBhIGRlbGV0ZSBidXR0b24gZm9yIG5ldyBib3hlc1xudmFyIGNyZWF0ZURlbGV0ZUJ0biA9IGZ1bmN0aW9uKHBhcmVudCwgYXJyYXkpe1xuICB2YXIgZGVsZXRlQnRuID0gJCgnPGJ1dHRvbj5YPC9idXR0b24+Jyk7XG4gIGRlbGV0ZUJ0bi5hZGRDbGFzcygnZGVsZXRlQnRuJyk7XG4gIGRlbGV0ZUJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRlbGV0ZUNvbXBvbmVudChlLnRhcmdldCwgYXJyYXkpO1xuICB9KTtcbiAgZGVsZXRlQnRuLmFwcGVuZFRvKCcjJyArIHBhcmVudCk7XG59O1xuXG4vL2RlbGV0ZSBidXR0b24gY2xpY2sgaGFuZGxlciB0byBhbGxvdyBmb3IgZGVsZXRlZCBjb21wb25lbnQgbmFtZSB0byBiZSByZXVzZWRcbmZ1bmN0aW9uIGRlbGV0ZUNvbXBvbmVudChidXR0b24sIGFycmF5KXtcbiAgdmFyIHBhcmVudE5hbWUgPSBidXR0b24ucGFyZW50Tm9kZS5pZDtcbiAgYnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YocGFyZW50TmFtZSk7XG4gIGFycmF5LnNwbGljZShpbmRleCwxKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWxldGVCdG47XG4iLCIvL2Z1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgYW4gaW5wdXQgZmllbGQgaW4gbmV3IGJveGVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNvbnRleHQsIGZ1bmMpIHtcbiAgdmFyIGlucHV0RmllbGQgPSAkKCc8Zm9ybT48aW5wdXQgcmVxdWlyZWQgcGxhY2Vob2xkZXI9XCJjb21wb25lbnQgbmFtZS4uLlwiPjwvaW5wdXQ+PC9mb3JtPicpO1xuICBpbnB1dEZpZWxkLmFwcGVuZFRvKCcjJyArIGNvbnRleHQpO1xuICBpbnB1dEZpZWxkLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZnVuYygkKHRoaXMpKTtcbiAgfSk7XG59O1xuIiwidmFyIGNyZWF0ZURhdGFPYmogPSByZXF1aXJlKCcuL2NyZWF0ZURhdGFPYmonKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgLy9pbnRlcnByZXRzIHRoZSBET00gaW50byBhbiBvYmplY3RcbiAgdmFyIGRhdGFPYmogPSB7bmFtZTogJ2NvbnRhaW5lcicsIGNoaWxkcmVuOltdfTtcbiAgY3JlYXRlRGF0YU9iaihkYXRhT2JqLCAnI2NvbnRhaW5lcicpO1xuICAvL3Bvc3QgcmVxdWVzdCB0byBjcmVhdGUgUmVhY3QgZmlsZXMgYW5kIGRvd25sb2FkIHRoZSB6aXBcbiAgJC5hamF4KHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICB1cmw6ICcvc3VibWl0JyxcbiAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIHByb2plY3ROYW1lOiAnT3ZlclJlYWN0JyxcbiAgICAgIG1haW46IGRhdGFPYmpcbiAgICB9KSxcbiAgICAvL3RoaXMgaW5pdGlhdGVzIGRvd25sb2FkIG9uY2UgdGhlIGZpbGUgaXMgemlwcGVkXG4gICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9kb3dubG9hZCc7XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcbiAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogJywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
