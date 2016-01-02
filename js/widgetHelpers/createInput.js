import ToPascal from './toPascal';

//function called to create the input component name field and add event handlers
export default function(context, func) {
  const errorMessage = 'Please only use alphanumeric characters, underscores, or spaces';

  //pattern property makes sure they can only use alphanumeric characters, underscores, or spaces
  const inputField = $(`<form><input
    required
    pattern="[a-zA-Z0-9_ ]+"
    placeholder="Component Name..."
    title="${errorMessage}"
    class="form-control">
    </input></form>`
  );
  inputField.appendTo(('#' + context));
  inputField.on('submit', function(e){
    e.preventDefault();
    console.log('submit')
    //convert input to Pascal case
    $('#dup-warning').css('display', 'none')
    const output = ToPascal($(e.target).find('input').val());
    $(e.target).find('input').val(output);
    func($(this));
  });

};
