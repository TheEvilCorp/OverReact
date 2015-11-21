//function called to create an input field in new boxes
module.exports = function(context, func) {
  var inputField = $('<form><input required placeholder="component name..."></input></form>');
  inputField.appendTo('#' + context);
  inputField.on('submit', function(e){
    e.preventDefault();
    func($(this));
  });
};
