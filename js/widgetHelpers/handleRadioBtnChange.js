
function handleRadioBtnChange(e, obj) {
  var target = e.target.id;
  var newState = obj;
  switch (target) {
    case 'es6':
      newState.es6 = !newState.es6;
      break;
    case 'express':
      newState.express = true;
      newState.hapi = false;
      newState.basic = false;
      newState.gulp = !newState.gulp && !newState.grunt ? true : newState.gulp;
      break;
    case 'hapi':
      newState.express = false;
      newState.hapi = true;
      newState.basic = false;
      newState.gulp = !newState.gulp && !newState.grunt ? true : newState.gulp;
      break;
    case 'gulp':
      newState.gulp = true;
      newState.grunt = false;
      newState.basic = false;
      newState.express = !newState.express && !newState.hapi ? true : newState.express;
      break;
    case 'grunt':
      newState.gulp = false;
      newState.grunt = true;
      newState.basic = false;
      newState.express = !newState.express && !newState.hapi ? true : newState.express;
      break;
    default:
      newState.basic = !newState.basic;
        newState.express = newState.express ? false : true;
        newState.hapi = false;
        newState.gulp = newState.gulp ? false : true;
        newState.grunt = false;
      }
  return newState;
}

module.exports = handleRadioBtnChange;
