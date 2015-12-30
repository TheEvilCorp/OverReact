//delete button click handler to allow for deleted component name to be reused
function deleteComponent(button){
  mixpanel.track('Delete Component');
  button.parentNode.remove();
};

//function called to create a delete button for new boxes
export default function(parent){
  var deleteBtn = $('<button>X</button>');
  deleteBtn.addClass('deleteBtn');
  deleteBtn.on('click', function(e) {
    e.preventDefault();
    deleteComponent(e.target);
  });
  deleteBtn.appendTo('#' + parent);
};
