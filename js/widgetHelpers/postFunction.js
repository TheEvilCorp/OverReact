import CreateDataObj from './createDataObj';
import ReadFormData from './readFormData';

export default function(state, callback) {
  console.log(CreateDataObj, 'postfunc')
  const $overReactContainer = $('#overReact-container');
  //Retrieves data from form
  const form = ReadFormData(state)
  //interprets the DOM into an object
  const dataObj = {
    name: 'app',
    children: [],
    position: $overReactContainer.position(),
    height: $overReactContainer.height(),
    width: $overReactContainer.width()
  };

  CreateDataObj(dataObj, '#overReact-container');

  //post request to create React files and download the zip
  $.ajax({
    method: 'POST',
    url: '/submit',
    contentType: 'application/json',
    data: JSON.stringify({
      projectName: form.projectName || 'myOverReactProject',
      main: dataObj,
      server: form.server,
      task: form.task,
      template: form.es6,
    }),
    //this initiates download once the file is zipped
    success(uniqueID) {
      var name = form.projectName || 'myOverReactProject';
      callback(uniqueID,name);
    },
    error(err) {
      console.log('ERROR: ', err);
    }
  });
};
