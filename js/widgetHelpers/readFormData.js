  //Retrieves form data
export default function({projectName, es6, basic, express, gulp, grunt}){
  const formData = {
    projectName,
    es6: es6 ? 'es6' : 'es5',
    server: basic ? 'none' : express ? 'express' : 'hapi',
    task: basic ? 'none' : gulp ? 'gulp' : grunt ? 'grunt' : 'webpack'
  };
  return formData;
};
