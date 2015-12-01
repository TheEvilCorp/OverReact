function capitalize(req, res, next) {
  cap(req.body.main);
  next();
}

function cap(obj){
  //capitalize first letter, this is required for .jsx to render the variable name. <app /> => <app> bad </app> --- <App /> => <div> good </div>
  obj.name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);

  //breakout
  if(!obj.children) return;

  //call to convert all children
  return obj.children.map(elem => cap(elem));
}

module.exports = capitalize;
