var removeFromArray = require('./removeFromArray');

//function called to create a delete button for new boxes
var createDeleteBtn = function(parent){
  var deleteBtn = $('<button>X</button>');
  deleteBtn.addClass('deleteBtn');
  deleteBtn.on('click', function(e) {
    e.preventDefault();
    deleteComponent(e.target);
  });
  deleteBtn.appendTo('#' + parent);
};

//delete button click handler to allow for deleted component name to be reused
function deleteComponent(button){
  button.parentNode.remove();
}

module.exports = createDeleteBtn;
