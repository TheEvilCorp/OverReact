//control state for options selection
export default function handleRadioBtnChange(e, obj) {
  const target = e.target.id;
  const newState = obj;
  switch (target) {
    case 'es6':
      mixpanel.track('Clicked ES6');
      newState.es6 = !newState.es6;
      break;
    case 'express':
      mixpanel.track('Clicked Express');
      newState.express = true;
      newState.hapi = false;
      newState.basic = false;
      newState.gulp = !newState.gulp && !newState.grunt && !newState.webpack ?  true : newState.gulp;
      break;
    case 'hapi':
      mixpanel.track('Clicked Hapi');
      newState.express = false;
      newState.hapi = true;
      newState.basic = false;
      newState.gulp = !newState.gulp && !newState.grunt && !newState.webpack ? true : newState.gulp;
      break;
    case 'gulp':
      mixpanel.track('Clicked Gulp');
      newState.gulp = true;
      newState.grunt = false;
      newState.webpack = false;
      newState.basic = false;
      newState.express = !newState.express && !newState.hapi ? true : newState.express;
      break;
    case 'grunt':
      mixpanel.track('Clicked Grunt');
      newState.gulp = false;
      newState.grunt = true;
      newState.webpack = false;
      newState.basic = false;
      newState.express = !newState.express && !newState.hapi ? true : newState.express;
      break;
    case 'webpack':
      mixpanel.track('Clicked Webpack');
      newState.gulp = false;
      newState.grunt = false;
      newState.webpack = true;
      newState.basic = false;
      newState.express = !newState.express && !newState.hapi ? true : newState.express;
      break;
    default:
        mixpanel.track('Clicked React Components Only');
        newState.basic = !newState.basic;
        newState.express = newState.basic ? false : true;
        newState.hapi = false;
        newState.gulp = newState.basic ? false : true;
        newState.grunt = false;
        newState.webpack = false;
      }
  return newState;
};
