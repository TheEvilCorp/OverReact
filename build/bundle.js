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
      main: dataObj,
      server: 'express',
      task: 'grunt'
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy93aWRnZXQuanMiLCJqcy93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveC5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGF0YU9iai5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGVsZXRlQnRuLmpzIiwianMvd2lkZ2V0SGVscGVycy9jcmVhdGVJbnB1dC5qcyIsImpzL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFakUsQ0FBQyxDQUFDLFlBQVc7O0FBRVgsTUFBSSxRQUFRLEdBQUcsRUFBRTs7O0FBQUMsQUFHbEIsR0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOzs7QUFBQyxBQUc3QyxhQUFXLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQzs7O0FBQUMsQUFHMUMsV0FBUyxlQUFlLENBQUMsSUFBSSxFQUFDOztBQUU1QixRQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNELFFBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLFFBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUN6QyxX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O0FBQ3pDLGVBQWEsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDOztBQUFDLEFBRXJDLEdBQUMsQ0FBQyxJQUFJLENBQUM7QUFDTCxVQUFNLEVBQUUsTUFBTTtBQUNkLE9BQUcsRUFBRSxTQUFTO0FBQ2QsZUFBVyxFQUFFLGtCQUFrQjtBQUMvQixRQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUNuQixpQkFBVyxFQUFFLFdBQVc7QUFDeEIsVUFBSSxFQUFFLE9BQU87QUFDYixZQUFNLEVBQUUsU0FBUztBQUNqQixVQUFJLEVBQUUsT0FBTztLQUNkLENBQUM7O0FBRUYsV0FBTyxFQUFFLG1CQUFVO0FBQ2pCLFlBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxtQkFBaUIsV0FBVyxBQUFFLENBQUM7S0FDcEQ7QUFDRCxTQUFLLEVBQUUsZUFBUyxHQUFHLEVBQUM7QUFDbEIsYUFBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDN0I7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBjcmVhdGVCb3ggPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvY3JlYXRlQm94Jyk7XG52YXIgY3JlYXRlSW5wdXQgPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvY3JlYXRlSW5wdXQnKTtcbnZhciBwb3N0RnVuY3Rpb24gPSByZXF1aXJlKCcuL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uJyk7XG52YXIgY3JlYXRlRGVsZXRlQnRuID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZURlbGV0ZUJ0bicpO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAvL2NvbXBvbmVudCBuYW1lIGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgbmFtZXMgYW5kIHByZXZlbnQgZHVwbGljYXRpb25cbiAgdmFyIGFsbE5hbWVzID0gW107XG5cbiAgLy9wbGFjZSBjbGljayBoYW5kbGVyIG9uIHRoZSBzdWJtaXQgYnV0dG9uLiBDbGljayBoYW5kbGVyIHdpbGwgc2VuZCBwb3N0IHRvIGNyZWF0ZSBmaWxlcy5cbiAgJCgnI3N1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsIHBvc3RGdW5jdGlvbik7XG5cbiAgLy9jcmVhdGUgaW5wdXQgZmllbGQgb24gdGhlIG1haW4gY29udGFpbmVyXG4gIGNyZWF0ZUlucHV0KCdjb250YWluZXInLCBjcmVhdGVDb21wb25lbnQpO1xuXG4gIC8vbm9kZSBwYXJhbWV0ZXIgaXMgdGhlIGZvcm0gZG9tIGVsZW1lbnRcbiAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KG5vZGUpe1xuICAgIC8vZ2V0IHRoZSB2YWx1ZSBvZiB0aGUgaW5wdXQgZmllbGQgJiB0aGUgbmFtZSBvZiB0aGUgcGFyZW50IGNvbXBvbmVudFxuICAgIHZhciBjb21wb25lbnROYW1lID0gbm9kZS5maW5kKCdpbnB1dCcpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHBhcmVudE5hbWUgPSBub2RlLnBhcmVudCgpLmF0dHIoJ2lkJyk7XG5cbiAgICBpZihhbGxOYW1lcy5pbmRleE9mKGNvbXBvbmVudE5hbWUpICE9PSAtMSkge1xuICAgICAgYWxlcnQoJ2R1cGxpY2F0ZSBuYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vcHVzaCB0aGUgY29tcG9uZW50IG5hbWUgdG8gYW4gYXJyYXkgaW4gb3JkZXIgdG8ga2VlcCB0cmFjayBvZiBuYW1lcyAmIHByZXZlbnQgZHVwZXNcbiAgICAgIGFsbE5hbWVzLnB1c2goY29tcG9uZW50TmFtZSk7XG5cbiAgICAgIC8vY2xlYXIgb3V0IHRoZSBpbnB1dCBmaWVsZFxuICAgICAgbm9kZS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgIC8vY3JlYXRlIGEgbmV3IGJveFxuICAgICAgY3JlYXRlQm94KGNvbXBvbmVudE5hbWUsIHBhcmVudE5hbWUpO1xuXG4gICAgICAvL2NyZWF0ZSBpbnB1dCBmaWVsZFxuICAgICAgY3JlYXRlSW5wdXQoY29tcG9uZW50TmFtZSwgY3JlYXRlQ29tcG9uZW50KTtcblxuICAgICAgLy9jcmVhdGUgRGVsZXRlIEJ1dHRvblxuICAgICAgY3JlYXRlRGVsZXRlQnRuKGNvbXBvbmVudE5hbWUsIGFsbE5hbWVzKTtcbiAgICB9XG4gIH1cbn0pOy8vY2xvc2VzIGFub24gZnVuY3Rpb25cbiIsIi8vY3JlYXRlcyBhIG5ldyBib3ggZGl2IGFuZCBhcHBlbmRzIGl0IHRvIHRoZSBwYXJlbnQgbm9kZSAoY29udGV4dCkuIFNldHMgdGhlIGJveCB0byBiZSByZXNpemFibGUgYW5kIGRyYWdnYWJsZS4gQXBwbGllcyBkZWZhdWx0IENTUyBmb3IgZHluYW1pYyByZXNpemluZyBvZiBib3hlcyBpbnNpZGUgY2hpbGQgYm94ZXMuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChib3hOYW1lLCBjb250ZXh0KSB7XG4gIGNvbnRleHQgPSAkKCcjJyArIGNvbnRleHQpO1xuICAvL2NyZWF0ZSBhbmQgYXBwZW5kIGJveFxuICAkKCc8ZGl2IGNsYXNzPVwiYm94XCI+PGRpdj4nKS5hdHRyKCdpZCcsIGJveE5hbWUpLnRleHQoYm94TmFtZSlcbiAgICAuYXBwZW5kVG8oY29udGV4dClcbiAgICAuZHJhZ2dhYmxlKHtcbiAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50JyxcbiAgICB9KVxuICAgIC5yZXNpemFibGUoe1xuICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnXG4gICAgfSk7XG4gIC8vaW5pdGlhbCBzdHlsaW5nXG4gICQoJyMnICsgYm94TmFtZSkuY3NzKHtcbiAgICBoZWlnaHQ6IGNvbnRleHQuaGVpZ2h0KCkgKiAwLjMwLFxuICAgIHdpZHRoOiBjb250ZXh0LndpZHRoKCkgKiAwLjc1LFxuICAgIHRvcDogY29udGV4dC5wb3NpdGlvbigpLnRvcCArIDUsXG4gICAgbGVmdDogY29udGV4dC5wb3NpdGlvbigpLmxlZnQgKyA1LFxuICB9KTtcbn07XG4iLCIvLyBpbnRlcnByZXRzIHRoZSBET00gdG8gY3JlYXRlIGFuIG9iamVjdCBmb3IgdGhlIHBvc3QgZnVuY3Rpb24uXG52YXIgY3JlYXRlRGF0YU9iaiA9IGZ1bmN0aW9uIChkYXRhT2JqLCBlbGVtSUQpe1xuICB2YXIgY2hpbGRBcnJheSA9ICQoZWxlbUlEKS5jaGlsZHJlbignZGl2LmJveCcpLnRvQXJyYXkoKTtcbiAgdmFyIGNoaWxkTmFtZSwgY2hpbGRJRCwgbmV3T2JqO1xuXG4gIGNoaWxkQXJyYXkuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgY2hpbGROYW1lID0gJChjaGlsZCkuYXR0cignaWQnKTtcbiAgICBjaGlsZElEID0gJyMnICsgY2hpbGROYW1lO1xuICAgIG5ld09iaiA9IHtuYW1lOiBjaGlsZE5hbWUsIGNoaWxkcmVuOltdfTtcbiAgICBkYXRhT2JqLmNoaWxkcmVuLnB1c2gobmV3T2JqKTtcbiAgICBpZigkKGNoaWxkKS5jaGlsZHJlbignZGl2LmJveCcpLnRvQXJyYXkoKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRGF0YU9iaihuZXdPYmosIGNoaWxkSUQpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURhdGFPYmo7XG4iLCIvL2Z1bmN0aW9uIGNhbGxlZCB0byBjcmVhdGUgYSBkZWxldGUgYnV0dG9uIGZvciBuZXcgYm94ZXNcbnZhciBjcmVhdGVEZWxldGVCdG4gPSBmdW5jdGlvbihwYXJlbnQsIGFycmF5KXtcbiAgdmFyIGRlbGV0ZUJ0biA9ICQoJzxidXR0b24+WDwvYnV0dG9uPicpO1xuICBkZWxldGVCdG4uYWRkQ2xhc3MoJ2RlbGV0ZUJ0bicpO1xuICBkZWxldGVCdG4ub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkZWxldGVDb21wb25lbnQoZS50YXJnZXQsIGFycmF5KTtcbiAgfSk7XG4gIGRlbGV0ZUJ0bi5hcHBlbmRUbygnIycgKyBwYXJlbnQpO1xufTtcblxuLy9kZWxldGUgYnV0dG9uIGNsaWNrIGhhbmRsZXIgdG8gYWxsb3cgZm9yIGRlbGV0ZWQgY29tcG9uZW50IG5hbWUgdG8gYmUgcmV1c2VkXG5mdW5jdGlvbiBkZWxldGVDb21wb25lbnQoYnV0dG9uLCBhcnJheSl7XG4gIHZhciBwYXJlbnROYW1lID0gYnV0dG9uLnBhcmVudE5vZGUuaWQ7XG4gIGJ1dHRvbi5wYXJlbnROb2RlLnJlbW92ZSgpO1xuICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKHBhcmVudE5hbWUpO1xuICBhcnJheS5zcGxpY2UoaW5kZXgsMSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVsZXRlQnRuO1xuIiwiLy9mdW5jdGlvbiBjYWxsZWQgdG8gY3JlYXRlIGFuIGlucHV0IGZpZWxkIGluIG5ldyBib3hlc1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihjb250ZXh0LCBmdW5jKSB7XG4gIHZhciBpbnB1dEZpZWxkID0gJCgnPGZvcm0+PGlucHV0IHJlcXVpcmVkIHBsYWNlaG9sZGVyPVwiY29tcG9uZW50IG5hbWUuLi5cIj48L2lucHV0PjwvZm9ybT4nKTtcbiAgaW5wdXRGaWVsZC5hcHBlbmRUbygnIycgKyBjb250ZXh0KTtcbiAgaW5wdXRGaWVsZC5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGZ1bmMoJCh0aGlzKSk7XG4gIH0pO1xufTtcbiIsInZhciBjcmVhdGVEYXRhT2JqID0gcmVxdWlyZSgnLi9jcmVhdGVEYXRhT2JqJyk7XG52YXIgcHJvamVjdE5hbWUgPSAnT3ZlclJlYWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vaW50ZXJwcmV0cyB0aGUgRE9NIGludG8gYW4gb2JqZWN0XG4gIHZhciBkYXRhT2JqID0ge25hbWU6ICdhcHAnLCBjaGlsZHJlbjpbXX07XG4gIGNyZWF0ZURhdGFPYmooZGF0YU9iaiwgJyNjb250YWluZXInKTtcbiAgLy9wb3N0IHJlcXVlc3QgdG8gY3JlYXRlIFJlYWN0IGZpbGVzIGFuZCBkb3dubG9hZCB0aGUgemlwXG4gICQuYWpheCh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgdXJsOiAnL3N1Ym1pdCcsXG4gICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBwcm9qZWN0TmFtZTogJ092ZXJSZWFjdCcsXG4gICAgICBtYWluOiBkYXRhT2JqLFxuICAgICAgc2VydmVyOiAnZXhwcmVzcycsXG4gICAgICB0YXNrOiAnZ3J1bnQnXG4gICAgfSksXG4gICAgLy90aGlzIGluaXRpYXRlcyBkb3dubG9hZCBvbmNlIHRoZSBmaWxlIGlzIHppcHBlZFxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKCl7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvZG93bmxvYWQvOiR7cHJvamVjdE5hbWV9YDtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbihlcnIpe1xuICAgICAgY29uc29sZS5sb2coJ0VSUk9SOiAnLCBlcnIpO1xuICAgIH1cbiAgfSk7XG59O1xuIl19
