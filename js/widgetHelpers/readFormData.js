  //Retrieves form data
  function readFormData(state){
    var formData = {};

    //Retrieve projectName from user input
    formData.projectName = state.projectName;

    //es6 vs es5 template
    formData.es6 = state.es6 ? 'es6' : 'es5';

    //Read checkboxes & radio button selection
    if(state.basic) {
      formData.server = 'none';
      formData.task = 'none';
    } else {
      formData.server = state.express ? 'express' : 'hapi';
      formData.task = state.gulp ? 'gulp' : 'grunt';
    }
    console.log(formData.projectName + ' ' + formData.server + ' ' + formData.task)

    return formData;
  }



  module.exports = readFormData;
