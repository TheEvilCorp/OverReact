  //Retrieves form data
  function readFormData(){
    var formData = {};
  
    //Retrieve projectName from user input 
    formData.projectName = $('#projectName').val();
    if(formData.projectName === "") formData.projectName = 'myReactProject';
    
    //Read checkboxes & radio button selections
    var basic, express, gulp
    basic = $('#basic').prop('checked');
    if(!basic) {
      express = $('#express').prop('checked');
      gulp = $('#gulp').prop('checked');  
    }
    
    if(basic) {
      formData.server = 'none';
      formData.task = 'none';
    } else {
      if(express) formData.server = 'express';
      else formData.server = 'hapi';
      if(gulp) formData.task = 'gulp';
      else formData.task = 'grunt';
    }
    console.log(formData.projectName + ' ' + formData.server + ' ' + formData.task)  
    
    return formData;
  }



  module.exports = readFormData;

  