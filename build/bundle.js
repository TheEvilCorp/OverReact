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
  var submitButton = $('#submitButton');
  submitButton.on('click', postFunction);

  //create button & input field on the main container
  createInput('container', createComponent);

  function createComponent(node) {
    //getting the value of the input field & the name of the parent component
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
    top: context.css('top') + 25,
    left: context.css('left') + 25
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy93aWRnZXQuanMiLCJqcy93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveC5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGF0YU9iai5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGVsZXRlQnRuLmpzIiwianMvd2lkZ2V0SGVscGVycy9jcmVhdGVJbnB1dC5qcyIsImpzL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFakUsQ0FBQyxDQUFDLFlBQVc7O0FBRVgsTUFBSSxRQUFRLEdBQUcsRUFBRTs7O0FBQUMsQUFHbEIsTUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3RDLGNBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQzs7O0FBQUMsQUFHdkMsYUFBVyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFMUMsV0FBUyxlQUFlLENBQUMsSUFBSSxFQUFDOztBQUU1QixRQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzdDLFFBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLFFBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENB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QUFFL0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFXOztBQUUxQixNQUFJLE9BQU8sR0FBRyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDO0FBQy9DLGVBQWEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOztBQUFDLEFBRXJDLEdBQUMsQ0FBQyxJQUFJLENBQUM7QUFDTCxVQUFNLEVBQUUsTUFBTTtBQUNkLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLGtCQUFrQjtBQUMvQixRQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNuQixpQkFBVyxFQUFFLFdBQVc7QUFDeEIsVUFBSSxFQUFFLE9BQU87S0FDZCxDQUFDOztBQUVGLFdBQU8sRUFBRSxtQkFBVTtBQUNqQixZQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7S0FDcEM7QUFDRCxTQUFLLEVBQUUsZUFBUyxHQUFHLEVBQUM7QUFDbEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjcmVhdGVCb3ggPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvY3JlYXRlQm94Jyk7XG52YXIgY3JlYXRlSW5wdXQgPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvY3JlYXRlSW5wdXQnKTtcbnZhciBwb3N0RnVuY3Rpb24gPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uJyk7XG52YXIgY3JlYXRlRGVsZXRlQnRuID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZURlbGV0ZUJ0bicpO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAvL2NvbXBvbmVudCBuYW1lIGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgbmFtZXMgYW5kIHByZXZlbnQgZHVwbGljYXRpb25cbiAgdmFyIGFsbE5hbWVzID0gW107XG5cbiAgLy9wbGFjZSBjbGljayBoYW5kbGVyIG9uIHRoZSBzdWJtaXQgYnV0dG9uLiBDbGljayBoYW5kbGVyIHdpbGwgc2VuZCBwb3N0IHRvIGNyZWF0ZSBmaWxlcy5cbiAgdmFyIHN1Ym1pdEJ1dHRvbiA9ICQoJyNzdWJtaXRCdXR0b24nKTtcbiAgc3VibWl0QnV0dG9uLm9uKCdjbGljaycsIHBvc3RGdW5jdGlvbik7XG5cbiAgLy9jcmVhdGUgYnV0dG9uICYgaW5wdXQgZmllbGQgb24gdGhlIG1haW4gY29udGFpbmVyXG4gIGNyZWF0ZUlucHV0KCdjb250YWluZXInLCBjcmVhdGVDb21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudChub2RlKXtcbiAgICAvL2dldHRpbmcgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBmaWVsZCAmIHRoZSBuYW1lIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBub2RlLmZpbmQoJ2lucHV0JykudmFsKCk7XG4gICAgdmFyIHBhcmVudE5hbWUgPSBub2RlLnBhcmVudCgpLmF0dHIoJ2lkJyk7XG5cbiAgICBpZihhbGxOYW1lcy5pbmRleE9mKGNvbXBvbmVudE5hbWUpICE9PSAtMSkge1xuICAgICAgYWxlcnQoJ2R1cGxpY2F0ZSBuYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vcHVzaCB0aGUgY29tcG9uZW50IG5hbWUgdG8gYW4gYXJyYXkgaW4gb3JkZXIgdG8ga2VlcCB0cmFjayBvZiBuYW1lcyAmIHByZXZlbnQgZHVwZXNcbiAgICAgIGFsbE5hbWVzLnB1c2goY29tcG9uZW50TmFtZSk7XG5cbiAgICAgIC8vY2xlYXIgb3V0IHRoZSBpbnB1dCBmaWVsZFxuICAgICAgbm9kZS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgIC8vY3JlYXRlIGEgbmV3IGJveFxuICAgICAgY3JlYXRlQm94KGNvbXBvbmVudE5hbWUsIHBhcmVudE5hbWUpO1xuXG4gICAgICAvL2NyZWF0ZSBpbnB1dCBmaWVsZFxuICAgICAgY3JlYXRlSW5wdXQoY29tcG9uZW50TmFtZSwgY3JlYXRlQ29tcG9uZW50KTtcblxuICAgICAgLy9jcmVhdGUgRGVsZXRlIEJ1dHRvblxuICAgICAgY3JlYXRlRGVsZXRlQnRuKGNvbXBvbmVudE5hbWUsIGFsbE5hbWVzKTtcbiAgICB9XG4gIH1cbn0pOy8vY2xvc2VzIGFub24gZnVuY3Rpb25cbiIsIi8vY3JlYXRlcyBhIG5ldyBib3ggZGl2IGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBwYXJlbnQgbm9kZSAoY29udGV4dCkuIFNldHMgdGhlIGJveCB0byBiZSByZXNpemFibGUgYW5kIGRyYWdnYWJsZS4gQXBwbGllcyBkZWZhdWx0IENTUyBmb3IgZHluYW1pYyByZXNpemluZyBvZiBib3hlcyBpbnNpZGUgY2hpbGQgYm94ZXMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChib3hOYW1lLCBjb250ZXh0KSB7XG4gIGNvbnRleHQgPSAkKCcjJyArIGNvbnRleHQpO1xuICAvL2NyZWF0ZSBhbmQgYXBwZW5kIGJveFxuICAkKCc8ZGl2IGNsYXNzPVwiYm94XCI+PGRpdj4nKS5hdHRyKCdpZCcsIGJveE5hbWUpLnRleHQoYm94TmFtZSlcbiAgICAuYXBwZW5kVG8oY29udGV4dClcbiAgICAuZHJhZ2dhYmxlKHtcbiAgICAgIGNvbnRhaW5tZW50OiAnIycgKyBjb250ZXh0WzBdLmlkLFxuICAgIH0pXG4gICAgLnJlc2l6YWJsZSh7XG4gICAgICBjb250YWlubWVudDogJyMnICsgY29udGV4dFswXS5pZFxuICAgIH0pO1xuICAvL2luaXRpYWwgc3R5bGluZ1xuICAkKCcjJyArIGJveE5hbWUpLmNzcyh7XG4gICAgaGVpZ2h0OiBjb250ZXh0LmhlaWdodCgpICogMC4zMCxcbiAgICB3aWR0aDogY29udGV4dC53aWR0aCgpICogMC43NSxcbiAgICB0b3A6IGNvbnRleHQuY3NzKCd0b3AnKSArIDI1LFxuICAgIGxlZnQ6IGNvbnRleHQuY3NzKCdsZWZ0JykgKyAyNSxcbiAgfSk7XG59O1xuIiwiLy8gaW50ZXJwcmV0cyB0aGUgRE9NIHRvIGNyZWF0ZSBhbiBvYmplY3QgZm9yIHRoZSBwb3N0IGZ1bmN0aW9uLlxudmFyIGNyZWF0ZURhdGFPYmogPSBmdW5jdGlvbiAoZGF0YU9iaiwgZWxlbUlEKXtcbiAgdmFyIGNoaWxkQXJyYXkgPSAkKGVsZW1JRCkuY2hpbGRyZW4oJ2Rpdi5ib3gnKS50b0FycmF5KCk7XG4gIHZhciBjaGlsZE5hbWUsIGNoaWxkSUQsIG5ld09iajtcblxuICBjaGlsZEFycmF5LmZvckVhY2goY2hpbGQgPT4ge1xuICAgIGNoaWxkTmFtZSA9ICQoY2hpbGQpLmF0dHIoJ2lkJyk7XG4gICAgY2hpbGRJRCA9ICcjJyArIGNoaWxkTmFtZTtcbiAgICBuZXdPYmogPSB7bmFtZTogY2hpbGROYW1lLCBjaGlsZHJlbjpbXX07XG4gICAgZGF0YU9iai5jaGlsZHJlbi5wdXNoKG5ld09iaik7XG4gICAgaWYoJChjaGlsZCkuY2hpbGRyZW4oJ2Rpdi5ib3gnKS50b0FycmF5KCkubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZURhdGFPYmoobmV3T2JqLCBjaGlsZElEKTtcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURhdGFPYmo7XG4iLCJ2YXIgYWxsTmFtZXMgPSByZXF1aXJlKCcuLy4uL3dpZGdldCcpO1xuLy9mdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIGEgZGVsZXRlIGJ1dHRvbiBmb3IgbmV3IGJveGVzXG52YXIgY3JlYXRlRGVsZXRlQnRuID0gZnVuY3Rpb24ocGFyZW50LCBhcnJheSl7XG4gIHZhciBkZWxldGVCdG4gPSAkKCc8YnV0dG9uPlg8L2J1dHRvbj4nKTtcbiAgZGVsZXRlQnRuLmFkZENsYXNzKCdkZWxldGVCdG4nKTtcbiAgZGVsZXRlQnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZGVsZXRlQ29tcG9uZW50KGUudGFyZ2V0LCBhcnJheSk7XG4gIH0pO1xuICBkZWxldGVCdG4uYXBwZW5kVG8oJyMnICsgcGFyZW50KTtcbn07XG5cbi8vZGVsZXRlIGJ1dHRvbiBjbGljayBoYW5kbGVyIHRvIGFsbG93IGZvciBkZWxldGVkIGNvbXBvbmVudCBuYW1lIHRvIGJlIHJldXNlZFxuZnVuY3Rpb24gZGVsZXRlQ29tcG9uZW50KGJ1dHRvbiwgYXJyYXkpe1xuICB2YXIgcGFyZW50TmFtZSA9IGJ1dHRvbi5wYXJlbnROb2RlLmlkO1xuICBidXR0b24ucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZihwYXJlbnROYW1lKTtcbiAgYXJyYXkuc3BsaWNlKGluZGV4LDEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlbGV0ZUJ0bjtcbiIsIi8vZnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSBhbiBpbnB1dCBmaWVsZCBpbiBuZXcgYm94ZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCwgZnVuYykge1xuICB2YXIgaW5wdXRGaWVsZCA9ICQoJzxmb3JtPjxpbnB1dCByZXF1aXJlZCBwbGFjZWhvbGRlcj1cImNvbXBvbmVudCBuYW1lLi4uXCI+PC9pbnB1dD48L2Zvcm0+Jyk7XG4gIGlucHV0RmllbGQuYXBwZW5kVG8oJyMnICsgY29udGV4dCk7XG4gIGlucHV0RmllbGQub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmdW5jKCQodGhpcykpO1xuICB9KTtcbn07XG4iLCJ2YXIgY3JlYXRlRGF0YU9iaiA9IHJlcXVpcmUoJy4vY3JlYXRlRGF0YU9iaicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAvL2ludGVycHJldHMgdGhlIERPTSBpbnRvIGFuIG9iamVjdFxuICB2YXIgZGF0YU9iaiA9IHtuYW1lOiAnY29udGFpbmVyJywgY2hpbGRyZW46W119O1xuICBjcmVhdGVEYXRhT2JqKGRhdGFPYmosICcjY29udGFpbmVyJyk7XG4gIC8vcG9zdCByZXF1ZXN0IHRvIGNyZWF0ZSBSZWFjdCBmaWxlcyBhbmQgZG93bmxvYWQgdGhlIHppcFxuICAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy9zdWJtaXQnLFxuICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgcHJvamVjdE5hbWU6ICdPdmVyUmVhY3QnLFxuICAgICAgbWFpbjogZGF0YU9ialxuICAgIH0pLFxuICAgIC8vdGhpcyBpbml0aWF0ZXMgZG93bmxvYWQgb25jZSB0aGUgZmlsZSBpcyB6aXBwZWRcbiAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2Rvd25sb2FkJztcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xuICAgICAgY29uc29sZS5sb2coJ0VSUk9SOiAnLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
