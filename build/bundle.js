(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var createBox = require('./widgetHelpers/createBox');
var createInput = require('./widgetHelpers/createInput');
var postFunction = require('./widgetHelpers/postFunction');
var createDeleteBtn = require('./widgetHelpers/createDeleteBtn');

$(function () {
  //component name array to keep track of names and prevent duplication
  var allNames = [];
  var savedTemplate = [];

  //place click handler on the submit button. Click handler will send post to create files.
  $('#submitButton').on('click', postFunction);

  //create input field on the main container
  createInput('container', createComponent);

  //add save and load stuffs
  $('#saveButton').on('click', function (e) {
    savedTemplate = [];
    for (var i = 0; i < allNames.length; i++) {
      allNames[i].style = $('#' + allNames[i].name).attr('style');
      savedTemplate.push(allNames[i]);
    }
    console.log(allNames);
  });

  $('#loadButton').on('click', function (e) {
    $('.box').each(function (i) {
      this.remove();
    });
    allNames = [];
    for (var i = 0; i < savedTemplate.length; i++) {
      console.log('cloning...');
      createComponent(null, savedTemplate[i]);
    }
  });

  //node parameter is the form dom element
  function createComponent(node, obj) {
    //get the value of the input field & the name of the parent component
    var componentName;
    var parentName;

    if (obj) {
      componentName = obj.name;
      parentName = obj.context;
    } else {
      componentName = node.find('input').val().toLowerCase();
      parentName = node.parent().attr('id');
    }

    if (allNames.map(function (e) {
      return e.name;
    }).indexOf(componentName) !== -1) {
      alert('duplicate name');
    } else {
      //push the component name to an array in order to keep track of names & prevent dupes
      allNames.push({ name: componentName, context: parentName, style: null });

      //clear out the input field
      if (!obj) node.find('input').val('');

      //create a new box
      if (obj) {
        createBox(componentName, parentName, obj.style);
      } else {
        createBox(componentName, parentName);
      }

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
module.exports = function (boxName, context, style) {
  context = $('#' + context);
  //create and append box
  $('<div class="box"><div>').attr('id', boxName).text(boxName).appendTo(context).draggable({
    containment: 'parent'
  }).resizable({
    containment: 'parent'
  });
  //initial styling
  if (style) {
    $('#' + boxName).attr('style', style);
  } else {
    $('#' + boxName).css({
      height: context.height() * 0.30,
      width: context.width() * 0.75,
      top: context.position().top + 5,
      left: context.position().left + 5
    });
  }
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
  var index = array.map(function (e) {
    return e.name;
  }).indexOf(parentName);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy93aWRnZXQuanMiLCJqcy93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveC5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGF0YU9iai5qcyIsImpzL3dpZGdldEhlbHBlcnMvY3JlYXRlRGVsZXRlQnRuLmpzIiwianMvd2lkZ2V0SGVscGVycy9jcmVhdGVJbnB1dC5qcyIsImpzL3dpZGdldEhlbHBlcnMvcG9zdEZ1bmN0aW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUNyRCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN6RCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUMzRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQzs7QUFFakUsQ0FBQyxDQUFDLFlBQVc7O0FBRVgsTUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQUksYUFBYSxHQUFHLEVBQUU7OztBQUFDLEFBR3ZCLEdBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQzs7O0FBQUMsQUFHN0MsYUFBVyxDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUM7OztBQUFDLEFBRzFDLEdBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQ3JDLGlCQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hDLGNBQVEsQ0FBQyxDQUFDLENBQUMsQ0FB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O0FBQ2xCLGFBQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzdCO0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgY3JlYXRlQm94ID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZUJveCcpO1xudmFyIGNyZWF0ZUlucHV0ID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL2NyZWF0ZUlucHV0Jyk7XG52YXIgcG9zdEZ1bmN0aW9uID0gcmVxdWlyZSgnLi93aWRnZXRIZWxwZXJzL3Bvc3RGdW5jdGlvbicpO1xudmFyIGNyZWF0ZURlbGV0ZUJ0biA9IHJlcXVpcmUoJy4vd2lkZ2V0SGVscGVycy9jcmVhdGVEZWxldGVCdG4nKTtcblxuJChmdW5jdGlvbigpIHtcbiAgLy9jb21wb25lbnQgbmFtZSBhcnJheSB0byBrZWVwIHRyYWNrIG9mIG5hbWVzIGFuZCBwcmV2ZW50IGR1cGxpY2F0aW9uXG4gIHZhciBhbGxOYW1lcyA9IFtdO1xuICB2YXIgc2F2ZWRUZW1wbGF0ZSA9IFtdO1xuXG4gIC8vcGxhY2UgY2xpY2sgaGFuZGxlciBvbiB0aGUgc3VibWl0IGJ1dHRvbi4gQ2xpY2sgaGFuZGxlciB3aWxsIHNlbmQgcG9zdCB0byBjcmVhdGUgZmlsZXMuXG4gICQoJyNzdWJtaXRCdXR0b24nKS5vbignY2xpY2snLCBwb3N0RnVuY3Rpb24pO1xuXG4gIC8vY3JlYXRlIGlucHV0IGZpZWxkIG9uIHRoZSBtYWluIGNvbnRhaW5lclxuICBjcmVhdGVJbnB1dCgnY29udGFpbmVyJywgY3JlYXRlQ29tcG9uZW50KTtcblxuICAvL2FkZCBzYXZlIGFuZCBsb2FkIHN0dWZmc1xuICAkKCcjc2F2ZUJ1dHRvbicpLm9uKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgc2F2ZWRUZW1wbGF0ZSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFsbE5hbWVzW2ldLnN0eWxlID0gJCgnIycgKyBhbGxOYW1lc1tpXS5uYW1lKS5hdHRyKCdzdHlsZScpO1xuICAgICAgc2F2ZWRUZW1wbGF0ZS5wdXNoKGFsbE5hbWVzW2ldKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coYWxsTmFtZXMpO1xuICB9KTtcblxuXG4gICQoJyNsb2FkQnV0dG9uJykub24oJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAkKCcuYm94JykuZWFjaChmdW5jdGlvbihpKXt0aGlzLnJlbW92ZSgpfSk7XG4gICAgYWxsTmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNhdmVkVGVtcGxhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjbG9uaW5nLi4uJyk7XG4gICAgICBjcmVhdGVDb21wb25lbnQobnVsbCwgc2F2ZWRUZW1wbGF0ZVtpXSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIC8vbm9kZSBwYXJhbWV0ZXIgaXMgdGhlIGZvcm0gZG9tIGVsZW1lbnRcbiAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50KG5vZGUsIG9iail7XG4gICAgLy9nZXQgdGhlIHZhbHVlIG9mIHRoZSBpbnB1dCBmaWVsZCAmIHRoZSBuYW1lIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50XG4gICAgdmFyIGNvbXBvbmVudE5hbWU7XG4gICAgdmFyIHBhcmVudE5hbWU7XG5cbiAgICBpZiAob2JqKSB7XG4gICAgICBjb21wb25lbnROYW1lID0gb2JqLm5hbWU7XG4gICAgICBwYXJlbnROYW1lID0gb2JqLmNvbnRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBub2RlLmZpbmQoJ2lucHV0JykudmFsKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHBhcmVudE5hbWUgPSBub2RlLnBhcmVudCgpLmF0dHIoJ2lkJyk7XG4gICAgfVxuXG4gICAgaWYoYWxsTmFtZXMubWFwKGZ1bmN0aW9uKGUpIHtyZXR1cm4gZS5uYW1lfSkuaW5kZXhPZihjb21wb25lbnROYW1lKSAhPT0gLTEpIHtcbiAgICAgIGFsZXJ0KCdkdXBsaWNhdGUgbmFtZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvL3B1c2ggdGhlIGNvbXBvbmVudCBuYW1lIHRvIGFuIGFycmF5IGluIG9yZGVyIHRvIGtlZXAgdHJhY2sgb2YgbmFtZXMgJiBwcmV2ZW50IGR1cGVzXG4gICAgICBhbGxOYW1lcy5wdXNoKHtuYW1lOiBjb21wb25lbnROYW1lLCBjb250ZXh0OiBwYXJlbnROYW1lLCBzdHlsZTogbnVsbH0pO1xuXG4gICAgICAvL2NsZWFyIG91dCB0aGUgaW5wdXQgZmllbGRcbiAgICAgIGlmICghb2JqKSBub2RlLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcblxuICAgICAgLy9jcmVhdGUgYSBuZXcgYm94XG4gICAgICBpZiAob2JqKSB7XG4gICAgICAgIGNyZWF0ZUJveChjb21wb25lbnROYW1lLCBwYXJlbnROYW1lLCBvYmouc3R5bGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjcmVhdGVCb3goY29tcG9uZW50TmFtZSwgcGFyZW50TmFtZSk7XG4gICAgICB9XG5cbiAgICAgIC8vY3JlYXRlIGlucHV0IGZpZWxkXG4gICAgICBjcmVhdGVJbnB1dChjb21wb25lbnROYW1lLCBjcmVhdGVDb21wb25lbnQpO1xuXG4gICAgICAvL2NyZWF0ZSBEZWxldGUgQnV0dG9uXG4gICAgICBjcmVhdGVEZWxldGVCdG4oY29tcG9uZW50TmFtZSwgYWxsTmFtZXMpO1xuICAgIH1cbiAgfVxufSk7Ly9jbG9zZXMgYW5vbiBmdW5jdGlvblxuIiwiLy9jcmVhdGVzIGEgbmV3IGJveCBkaXYgYW5kIGFwcGVuZHMgaXQgdG8gdGhlIHBhcmVudCBub2RlIChjb250ZXh0KS4gU2V0cyB0aGUgYm94IHRvIGJlIHJlc2l6YWJsZSBhbmQgZHJhZ2dhYmxlLiBBcHBsaWVzIGRlZmF1bHQgQ1NTIGZvciBkeW5hbWljIHJlc2l6aW5nIG9mIGJveGVzIGluc2lkZSBjaGlsZCBib3hlcy5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGJveE5hbWUsIGNvbnRleHQsIHN0eWxlKSB7XG4gIGNvbnRleHQgPSAkKCcjJyArIGNvbnRleHQpO1xuICAvL2NyZWF0ZSBhbmQgYXBwZW5kIGJveFxuICAkKCc8ZGl2IGNsYXNzPVwiYm94XCI+PGRpdj4nKS5hdHRyKCdpZCcsIGJveE5hbWUpLnRleHQoYm94TmFtZSlcbiAgICAuYXBwZW5kVG8oY29udGV4dClcbiAgICAuZHJhZ2dhYmxlKHtcbiAgICAgIGNvbnRhaW5tZW50OiAncGFyZW50JyxcbiAgICB9KVxuICAgIC5yZXNpemFibGUoe1xuICAgICAgY29udGFpbm1lbnQ6ICdwYXJlbnQnXG4gICAgfSk7XG4gIC8vaW5pdGlhbCBzdHlsaW5nXG4gIGlmIChzdHlsZSkge1xuICAgICQoJyMnICsgYm94TmFtZSkuYXR0cignc3R5bGUnLCBzdHlsZSk7XG4gIH0gZWxzZSB7XG4gICAgJCgnIycgKyBib3hOYW1lKS5jc3Moe1xuICAgICAgaGVpZ2h0OiBjb250ZXh0LmhlaWdodCgpICogMC4zMCxcbiAgICAgIHdpZHRoOiBjb250ZXh0LndpZHRoKCkgKiAwLjc1LFxuICAgICAgdG9wOiBjb250ZXh0LnBvc2l0aW9uKCkudG9wICsgNSxcbiAgICAgIGxlZnQ6IGNvbnRleHQucG9zaXRpb24oKS5sZWZ0ICsgNSxcbiAgICB9KTtcbiAgfVxufTtcbiIsIi8vIGludGVycHJldHMgdGhlIERPTSB0byBjcmVhdGUgYW4gb2JqZWN0IGZvciB0aGUgcG9zdCBmdW5jdGlvbi5cbnZhciBjcmVhdGVEYXRhT2JqID0gZnVuY3Rpb24gKGRhdGFPYmosIGVsZW1JRCl7XG4gIHZhciBjaGlsZEFycmF5ID0gJChlbGVtSUQpLmNoaWxkcmVuKCdkaXYuYm94JykudG9BcnJheSgpO1xuICB2YXIgY2hpbGROYW1lLCBjaGlsZElELCBuZXdPYmo7XG5cbiAgY2hpbGRBcnJheS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICBjaGlsZE5hbWUgPSAkKGNoaWxkKS5hdHRyKCdpZCcpO1xuICAgIGNoaWxkSUQgPSAnIycgKyBjaGlsZE5hbWU7XG4gICAgbmV3T2JqID0ge25hbWU6IGNoaWxkTmFtZSwgY2hpbGRyZW46W119O1xuICAgIGRhdGFPYmouY2hpbGRyZW4ucHVzaChuZXdPYmopO1xuICAgIGlmKCQoY2hpbGQpLmNoaWxkcmVuKCdkaXYuYm94JykudG9BcnJheSgpLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjcmVhdGVEYXRhT2JqKG5ld09iaiwgY2hpbGRJRCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGF0YU9iajtcbiIsIi8vZnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSBhIGRlbGV0ZSBidXR0b24gZm9yIG5ldyBib3hlc1xudmFyIGNyZWF0ZURlbGV0ZUJ0biA9IGZ1bmN0aW9uKHBhcmVudCwgYXJyYXkpe1xuICB2YXIgZGVsZXRlQnRuID0gJCgnPGJ1dHRvbj5YPC9idXR0b24+Jyk7XG4gIGRlbGV0ZUJ0bi5hZGRDbGFzcygnZGVsZXRlQnRuJyk7XG4gIGRlbGV0ZUJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRlbGV0ZUNvbXBvbmVudChlLnRhcmdldCwgYXJyYXkpO1xuICB9KTtcbiAgZGVsZXRlQnRuLmFwcGVuZFRvKCcjJyArIHBhcmVudCk7XG59O1xuXG4vL2RlbGV0ZSBidXR0b24gY2xpY2sgaGFuZGxlciB0byBhbGxvdyBmb3IgZGVsZXRlZCBjb21wb25lbnQgbmFtZSB0byBiZSByZXVzZWRcbmZ1bmN0aW9uIGRlbGV0ZUNvbXBvbmVudChidXR0b24sIGFycmF5KXtcbiAgdmFyIHBhcmVudE5hbWUgPSBidXR0b24ucGFyZW50Tm9kZS5pZDtcbiAgYnV0dG9uLnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gIHZhciBpbmRleCA9IGFycmF5Lm1hcChmdW5jdGlvbihlKSB7XG4gICAgcmV0dXJuIGUubmFtZTtcbiAgfSkuaW5kZXhPZihwYXJlbnROYW1lKTtcbiAgYXJyYXkuc3BsaWNlKGluZGV4LDEpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlbGV0ZUJ0bjtcbiIsIi8vZnVuY3Rpb24gY2FsbGVkIHRvIGNyZWF0ZSBhbiBpbnB1dCBmaWVsZCBpbiBuZXcgYm94ZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oY29udGV4dCwgZnVuYykge1xuICB2YXIgaW5wdXRGaWVsZCA9ICQoJzxmb3JtPjxpbnB1dCByZXF1aXJlZCBwbGFjZWhvbGRlcj1cImNvbXBvbmVudCBuYW1lLi4uXCI+PC9pbnB1dD48L2Zvcm0+Jyk7XG4gIGlucHV0RmllbGQuYXBwZW5kVG8oJyMnICsgY29udGV4dCk7XG4gIGlucHV0RmllbGQub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBmdW5jKCQodGhpcykpO1xuICB9KTtcbn07XG4iLCJ2YXIgY3JlYXRlRGF0YU9iaiA9IHJlcXVpcmUoJy4vY3JlYXRlRGF0YU9iaicpO1xudmFyIHByb2plY3ROYW1lID0gJ092ZXJSZWFjdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAvL2ludGVycHJldHMgdGhlIERPTSBpbnRvIGFuIG9iamVjdFxuICB2YXIgZGF0YU9iaiA9IHtuYW1lOiAnYXBwJywgY2hpbGRyZW46W119O1xuICBjcmVhdGVEYXRhT2JqKGRhdGFPYmosICcjY29udGFpbmVyJyk7XG4gIC8vcG9zdCByZXF1ZXN0IHRvIGNyZWF0ZSBSZWFjdCBmaWxlcyBhbmQgZG93bmxvYWQgdGhlIHppcFxuICAkLmFqYXgoe1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIHVybDogJy9zdWJtaXQnLFxuICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgcHJvamVjdE5hbWU6ICdPdmVyUmVhY3QnLFxuICAgICAgbWFpbjogZGF0YU9ialxuICAgIH0pLFxuICAgIC8vdGhpcyBpbml0aWF0ZXMgZG93bmxvYWQgb25jZSB0aGUgZmlsZSBpcyB6aXBwZWRcbiAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL2Rvd25sb2FkLzoke3Byb2plY3ROYW1lfWA7XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24oZXJyKXtcbiAgICAgIGNvbnNvbGUubG9nKCdFUlJPUjogJywgZXJyKTtcbiAgICB9XG4gIH0pO1xufTtcbiJdfQ==
