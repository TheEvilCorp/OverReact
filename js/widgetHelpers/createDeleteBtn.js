//function called to create a delete button for new boxes
var createDeleteBtn = function(parent, array){
  var deleteBtn = $('<button>X</button>');
  deleteBtn.addClass('deleteBtn');
  deleteBtn.on('click', function(e) {
    e.preventDefault();
    deleteComponent(e.target, array);
  });
  deleteBtn.appendTo('#' + parent);
};

//delete button click handler to allow for deleted component name to be reused
function deleteComponent(button, array){
  var parentName = button.parentNode.id;
  button.parentNode.remove();
  var index = array.map(function(e) {
    return e.name;
  }).indexOf(parentName);
  array.splice(index,1);
}

module.exports = createDeleteBtn;
